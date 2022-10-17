import express, {Request, Response}  from 'express'

const app = express()
const port = process.env.PORT || 3000


let videos = [
    {
        id: +(new Date()),
        title: "string",
        author: "string",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: (new Date().toISOString()),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: [
            "P144"
        ]
    },
]

app.get('/', (req: Request, res: Response) =>{
    res.send("Homework - Maria Bialetskay")
})
app.delete( '/testing/all-data', (req: Request, res:Response) =>{
    videos.length = 0
    res.send(204)
})
app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})
app.post('/videos', (req:Request, res: Response) =>{
    let title = req.body.title
    let author = req.body.author

    title.setAttribute("required", '')
    title.setAttribute("required", '')

    if(!title || typeof title !== "string" || !title.trim() || title.length > 40){
        res.status(400).send({
            errorsMessages: [
                {
                "message": "Incorrect title",
                "field": "title"
                }
            ],
        })
    }

    if(!author || typeof author !== "string" || !title.trim() || author.length > 20){
        res.status(400).send({
            errorsMessages: [
                {
                    "message": "Incorrect title",
                    "field": "title"
                }
            ],
        })
    }
    let availableResolutions = req.body.availableResolutions
    if(availableResolutions.length < 1){
        res.status(400).send({
            errorsMessages: [
                {
                    "message": "Incorrect title",
                    "field": "title"
                }
            ],
        })
    }

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-10-16T15:51:40.667Z",
        publicationDate: "2022-10-16T15:51:40.667Z",
        availableResolutions: req.body.availableResolutions
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
app.get('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const video = videos.find(v => v.id === id)
    if(video){
        res.send(video)
    } else {
        res.send(404)
    }
})
app.delete('/videos/:id',(req: Request, res: Response) => {
    const id = +req.params.id;
    const newVideos = videos.filter(v => v.id !== id)
    if(newVideos.length < videos.length) {
        videos = newVideos
        res.send(204)
    } else{
        res.send(404)
    }
})

//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})