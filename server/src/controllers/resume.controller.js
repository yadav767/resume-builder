//controller for getting the user resume

const resumeModel = require("../models/resume.model");
const imageKit = require("../service/imageKit");
const fs = require('fs')

async function getUserResume(req, res) {
    try {
        const userId = req.userId;

        //return user resumes;

        const resumes = await resumeModel.find({
            userId
        })
        return res.status(200).json({
            resumes
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

//controller for creating the resume

async function createResume(req, res) {
    try {
        const userId = req.userId;
        const { title } = req.body;

        //create new resume
        const newResume = await resumeModel.create({
            userId, title
        })

        //return success messsage
        return res.status(201).json({
            message: 'Resume created successfullt', resume: newResume
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

//controller for deleting the resume

async function deleteResume(req, res) {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await resumeModel.findOneAndDelete({ userId, _id: resumeId });

        //return success message
        return res.status(200).json({
            message: "Resume deleted successfully!"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}

//get user resume by id
async function getResumeById(req, res) {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        const resume = await resumeModel.findOne({ userId, _id: resumeId })
        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            })
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined
        return res.status(200).json({
            resume
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}

//get resume by id public 

async function getPublicResumeById(req, res) {
    try {
        const { resumeId } = req.params;
        const resume = await resumeModel.findOne({ public: true, _id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        return res.status(200).json({ resume })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

//controller for updating th resume 

async function updateResume(req, res) {
    try {
        const userId = req.userId
        const { resumeId, resumeData, removeBackground } = req.body;

        const image = req.file;
        let resumeDataCopy ;
        if(typeof resumeData==='string'){
            resumeDataCopy=await JSON.parse(resumeData)
        }else{
            resumeDataCopy=structuredClone(resumeData)
        }

        if (image) {
            const imageBufferData = fs.createReadStream(image.path)
            const response = await imageKit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: "user-resumes",
                transformation: {
                    pre: "w-300,h-300,fo-focus ,z-0.75" + (removeBackground ? ',e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url
        }


        const resume = await resumeModel.findOneAndUpdate({ userId, _id: resumeId }, resumeDataCopy, {
            new: true
        })

        return res.status(200).json({
            message: "Resume updated successfully", resume
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


module.exports = {
    getUserResume,
    createResume,
    deleteResume,
    getResumeById,
    getPublicResumeById,
    updateResume
}