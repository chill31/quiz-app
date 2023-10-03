import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/create-quiz", "/quiz/(.*)", "/api/totalQuizByUser", "/api/analysis/(.*)", "/api/data"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
