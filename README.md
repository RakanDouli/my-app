
# Video upload coding challenge
Welcome! Glad to see you interested in working with scribit.pro. Below, you'll find the description of an exercise that is very close to the kind of work you'll be doing on a day-to-day basis.

The exercise is for us to get a feeling on how you typically work: what kind of decisions did you make? How would you approach X or Y? What's a priority for you when building something?

There is no perfect answer, nor should this exercise eat up all your free time. There are a couple of functionalities we'd like to try out in max 4 hours. Don't sweat it if you can't make it all work.


## What are we building? ✨
We're going to build an uploader! Just like many modern websites, I'd like to build a UI that allows selecting a video, uploads it and finally does something when uploading is complete.

To scope things down a bit, the concrete goals are:

1. Show a webpage where a customer can select a video from their local file system

2. After selecting the video, the file starts uploading to scribit.pro

3. When uploading is complete. Show an alert or dialog containing the URL of the video you've just uploaded

![Some inspiration as to what we'll be building](./inspiration.png)

### Extra assignments (when there is time)

- After selecting the video, I'd like to preview the video in a video player on the webpage while it's uploading

- Can we show the progress of uploading somewhere?

- Our network is [unreliable](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing), therefore we'd like a way of recovering the progress of an upload whenever an issue occurs. Hint: we call this feature "resumable upload"


## Technical constraints
Due to our current tech-stack, we are hoping you could deliver the solution using:

1. React with Typescript

2. [Material UI](https://mui.com/) as the basis for your components

3. Consuming our JSON API at: https://api.staging.scribit.pro/ (the Swagger API documentation is attached here.)

  

### Pre-requisites ✅

- Our API is authenticated. So create an account at https://dashboard.staging.scribit.pro/ and use that email and password to authenticate.


### Hints

- Use your email and password to generate a JWT Token in our API

- Use this JWT token in a call to start the upload of a video

- Use the link in the response of the uploaded video call to interact with the Google storage API. The link is a signed upload URL.


## Think about 💡

- Taking a look at the API documentation

- Taking a look at the Google Cloud Storage API documentation

- Where do you make the API requests?

- How much logic do you offload out of the UI components?

- Where do you keep track of the authentication state?