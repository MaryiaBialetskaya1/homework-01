import express, {Request, Response}  from 'express'

const app = express()
const port = process.env.PORT || 3000


let videos = [
    {
        id: new Date().toISOString(),
        title: "About JS - 01",
        author: "IT-INCUBATOR.EU",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-10-16T15:51:40.667Z",
        publicationDate: "2022-10-16T15:51:40.667Z",
        availableResolutions: [
            "P144"
        ]
    },
]

app.get('/', (req: Request, res: Response) =>{
    res.send("Homework - Maryia Bialetskaya!!!")
})
app.delete( '/testing/all-data', (req: Request, res:Response) =>{
    videos.length = 0
    res.send(204)
})
app.get('/videos', (req: Request, res: Response) =>{
    res.send(videos)
})
app.post('/videos', (req:Request, res: Response) =>{
    let title = req.body.title
    if(!title || typeof title !== "string" || !title.trim() || title.length > 40){
        res.status(400).send({
            errorsMessages: [
                {
                "message": "Incorrect title",
                "field": "title"
                }
            ],
            resultCode: 1
        })
    }
    let author =req.body.author
    if(!author || typeof author !== "string" || !title.trim() || author.length > 20){
        res.status(400).send({
            errorsMessages: [
                {
                    "message": "Incorrect title",
                    "field": "title, author"
                }
            ],
            resultCode: 1
        })
    }
    const newVideo = {
        id: new Date().toISOString(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-10-16T15:51:40.667Z",
        publicationDate: "2022-10-16T15:51:40.667Z",
        availableResolutions: [
            "P144"
        ]
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})



//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})