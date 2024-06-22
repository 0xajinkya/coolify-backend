import { NextFunction, Request, Response } from "express";
import { Collection, Post } from "../models";
import { Snowflake } from "@theinternetfolks/snowflake";

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

export const togglePostToCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: collectionId } = req.params;
    let deleted = false;
    const { postId } = req.query;

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
