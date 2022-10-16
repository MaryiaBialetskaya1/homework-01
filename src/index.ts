import express, {Request, Response}  from 'express'

const app = express()
const port = process.env.PORT || 3000


let videos = [
    {
        id: 1,
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

app.get('/videos', (req: Request, res: Response) =>{
    res.send(videos)
})

app.delete( '/testing/all-data', (req: Request, res:Response) =>{
    videos.length = 0
    res.send(204)
})

//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})