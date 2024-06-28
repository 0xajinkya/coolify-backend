import { NextFunction, Request, Response } from "express";
import { Collection, Post } from "../models";
import { Snowflake } from "@theinternetfolks/snowflake";
import { NonParametricError, ParametricError } from "../errors";
import { UpdatedAt } from "@sequelize/core/decorators-legacy";

export const createCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;

    const user = req.user;

    const collection = await Collection.create({
      name,
      description,
      id: Snowflake.generate(),
      ownerId: user!.id,
    });
    return res.status(201).json({
      status: true,
      content: {
        data: {
          id: collection.id,
          name: collection.name,
          description: collection.description,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.query.postId as string;

    const id = req.user!.id;
    let page = Number(req.query.page || 1);

    if (page <= 0) {
      page = 1;
    }

    const resp = await Collection.findAll({
      where: {
        ownerId: id,
      },
      limit: 10,
      offset: page === 1 ? 0 : 10 * (page - 1),
    });
    let newResp: any[] = []; // Initialize an array to hold transformed response

    if (postId) {
      await Promise.all(
        resp.map(async (collection) => {
          const post = await Post.findOne({
            where: {
              postId: postId,
              collectionId: collection.id,
            },
          });

          // Determine if post exists and add relevant information to newResp
          if (post) {
            newResp.push({
              ...collection.toJSON(),
              exists: true,
            });
          } else {
            newResp.push({
              ...collection.toJSON(),
              exists: false,
            });
          }
        })
      );
    } else {
      newResp = resp;
    }
    const totalCount = await Collection.count({
      where: {
        ownerId: id,
      },
    });
    return res.status(201).json({
      status: true,
      content: {
        meta: {
          page: page,
          pages: Math.ceil(totalCount / 10),
          total: totalCount,
        },
        data: newResp,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const page = Number(req.query.page as string);

    const collection = await Collection.findByPk(id);
    if(!collection) {
      throw new ParametricError([{message: "Collection not found!", code: "RESOURCE_EXISTS", param: "collection"}]);
    }
    if(collection.ownerId !== req.user!.id) {
      throw new NonParametricError([{message: "You do not have access to this colection!", code: "NOT_ALLOWED_ACCESS"}]);
    }
    const owner = await collection.getOwner();
    const posts = await Post.findAll({
      where: {
        collectionId: collection.id
      },
      offset: page > 1 ? (page - 1) * 10 : 0,
      limit: 10
    })
    const postsCount = await Post.count({
      where: {
        collectionId: collection.id
      }
    });

    return res.status(200).json({
      status: true,
      content: {
        data: {
          collection: {
            id: collection.id,
            name: collection.name,
            description: collection.description,
            createdAt: collection.createdAt,
            UpdatedAt: collection.updatedAt,
            owner: {
              name: owner?.name,
              id: owner?.id
            }
          },
          posts: posts
        },
        meta: {
          pages: Math.ceil(postsCount / 10),
          page: page > 1 ? page : 1,
          total: postsCount
        }
      }
    })
  } catch (error) {
    next(error);
  }
}

export const togglePostToCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: collectionId } = req.params;
    let deleted = false;
    const { postId } = req.query;

    if(!postId) {
      throw new ParametricError([{message: "Post not selected!", code: "INVALID_INPUT", param: "post"}]);
    }
    let post = await Post.findOne({
      where: {
        postId: postId as string,
        collectionId: collectionId as string,
      },
    });
    if (post) {
      await post.destroy();
      deleted = true;
    } else {
      post = await Post.create({
        collectionId: collectionId as string,
        postId: postId as string,
        id: Snowflake.generate(),
      });
    }
    return res.status(200).json({
      status: true,
      content: {
        post: post,
        code: !deleted ? "ADDED" : "REMOVED",
      },
    });
  } catch (error) {
    next(error);
  }
};


export const deleteCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const collection = await Collection.findByPk(id);
    if(!collection) {
      throw new ParametricError([{message: "Collection not found!", code: "RESOURCE_EXISTS", param: "collection"}]);
    }
    if(collection.ownerId !== req.user!.id) {
      throw new NonParametricError([{message: "You do not own this resource!", code: "NOT_ALLOWED_ACCESS"}]);
    }
    await collection.destroy();
    return res.status(200).json({
      status: true,
      message: "Collection " + collection.name + " deleted."
    })
  } catch (error) {
    next(error);
  }
}