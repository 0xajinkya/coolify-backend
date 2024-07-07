export const verifyEmailTemplate = (otp: string, name: string) => {
  return {
    subject: "Verify your email address with Coolify",
    email: `
            Hello ${name},
            This is Ajinkya from Coollify.
            Your OTP for verification at Coolify is "${otp}"
          `,
  };
};
