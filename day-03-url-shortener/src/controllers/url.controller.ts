import type { Request, Response } from "express";
import type { UrlService } from "../services/url.service.js";
import crypto from 'node:crypto';

export class UrlController {

    constructor(
        private readonly urlService : UrlService
    ){}

    createShortUrl = async(req : Request, res : Response)=>{
        try {
            const {url} = req.body;

            if(!url){
                return res.status(400).json({
                    success : false,
                    msg : "Url is required",
                    err : "BAD_REQUEST",
                    data : [],
                })
            }

            if(!isValidHttpUrl(url)){
                return res.status(400).json({
                    success : false,
                    msg : "URL is not valid",
                    err : "INVALID_URL",
                    data : []
                })
            }

            const shortCode = crypto.randomBytes(3).toString('hex');

            const result = await this
            .urlService
            .createShortUrl(shortCode, url);

            const baseUrl = 'http://localhost:3000/'

            return res.status(201).json({
                success : true,
                msg : "Short Url is created",
                data : {
                    result,
                    redirectUrl : baseUrl + result?.shortCode,
                    urlDetails : baseUrl + 'urls/' + result?.shortCode
                },
                err : null
            })
        } catch (err) {
            return res.status(400).json({
                success : false,
                msg : "Url shortner failed",
                err : err instanceof Error ? err.message : "Something went wrong",
                data : []
            })
        }
    }

    redirectToOriginalUrl = async(req : Request, res : Response)=>{
        try {
            
            const {shortCode} = req.params;

            if(!shortCode){
                return res.status(400).json({
                    success : false,
                    msg : "Shortcode is required",
                    err : "BAD_REQUEST, SHORTCODE_REQUIRED",
                    data :[]
                })
            }

            const result = await this
            .urlService
            .getUrlDetails(shortCode as string);
            
            if(!result){
                return res.status(404).json({
                    success : false,
                    msg : "Short code details not found",
                    err : "NOT_FOUND",
                    data : []
                })
            }


            return res.redirect(result.originalUrl)
        } catch (err) {
            return res.status(400).json({
                success : false,
                msg : "Url redirection failed",
                err : err instanceof Error ? err.message : "Something went wrong",
                data : []
            })
        }
    }

    getUrlDetails = async(req : Request, res : Response)=>{
        try {
            
            const {shortCode} = req.params;

            if(!shortCode){
                return res.status(400).json({
                    success : false,
                    msg : "Shortcode is required",
                    err : "BAD_REQUEST, SHORTCODE_REQUIRED",
                    data :[]
                })
            }

            const result = await this
            .urlService
            .getUrlDetails(shortCode as string);
            
            if(!result){
                return res.status(404).json({
                    success : false,
                    msg : "Short code details not found",
                    err : "NOT_FOUND",
                    data : []
                })
            }


            return res.status(200).json({
                success : true,
                msg : "URL details found",
                data : result,
                err : null
            })
        } catch (err) {
            return res.status(400).json({
                success : false,
                msg : "Url redirection failed",
                err : err instanceof Error ? err.message : "Something went wrong",
                data : []
            })
        }
    }
}

function isValidHttpUrl(url : string) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch (_) {
    return false;
  }
  return parsed.protocol === 'http:' || parsed.protocol === 'https:';
}   