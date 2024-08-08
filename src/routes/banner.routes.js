import { Router } from "express";
import { createBanner, deleteBannerById, getSingleBanner } from "../controller/banner.controller";

const bannerRouter = Router()

bannerRouter
    .post("/banner/add", createBanner)
    .get("/banners", deleteBannerById)
    .get("/banners/:bannerID", getSingleBanner)