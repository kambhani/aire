# aire
*Automatically tailor your resume & cover letter to each job posting.*
*Anish Kambhampati, Chris Farber, Ganning Xu, Sumanth Kanneti*

<img width="1293" alt="Screenshot 2024-02-11 at 5 15 32 AM" src="https://github.com/kambhani/aire/assets/62436772/152c9cb8-8a69-4ca8-b1cd-6927464b8ab9">


## The problem it solves
According to the National Center for Education Statistics (NCES), there are around 19 million college students in the United States, and around **40% of them are unemployed**. Futhermore, many college students---especially computer science majors---often need to apply to hundreds of internships before even receiving an interview. As computer science students ourselves, we have experienced the struggle of the time-consuming process of **writing each resume and cover letter manually to fit a job posting's description**, only to receive a **rejection email**. 

As one reddit user said...
> "I applied to at least 500+ positions (<- I wish I was kidding)...and one offer"

What's more, with uncertainty in the tech industry, many companies are laying off long-time employees, creating waves of unemployment. Since employment is often tied to health insurace, the lack of a job often results in the **inability to receive medical attention**, if needed. Moreover, unemployment also often leads to anxiety, depression, and not being able to plan for retirement. 

Thus, **we set out to save users the valuable time it takes them to tailor their resumes and cover letters for individual job postings**. With aire ("AI REsume"), users simply:

**User Onboarding**
1. Upload their current resume (optional)
2. aire parses their current resume and fills in as much information as we can (name, email, experiences, projects, skills, etc)
3. Users can edit the information parsed from their resume (and add more projects and experiences for aire to pull from)

**Generating Resume & Cover Letter**
2. Copy and paste any job posting
3. Click "Generate"
4. Users will receive a "matching score" on how well their resume fits the job description and suggestions for how their resume could be improved to better fit the job description.
5. Users receive a tailored resume & cover letter, both are fully editable in LaTeX.

## Challenges we ran into
With a project as complex as aire, it's no surprise that we faced several challenges along the way. That said, here are some of the big ones:

### Adding ChatGPT JSON to the Database
We used ChatGPT to parse out the user's profile information, education, experiences, projects, and skills. We instructed it to return a JSON object that we could then plug directly into our database. However, ChatGPT has a propensity to not return valid JSON, combine fields, and skip others entirely. This meant that we couldn't feed the JSON output directly. We had to check for null values, restrict the maximum size of each column, and properly send queries to create all of the different projects and experiences.

### Allowing Users to Create, Read, Update, and Delete Profile Information
One of the most important parts of our application is the ability for users to edit their profile information, whether or not it was initially populated by the resume parsing. This entailed creating an entire CRUD app from scratch. We had to create multiple different databases for each of the different parts of a resume, implement user accounts, and validate each request being sent. We also had to make a clean user interface for all of this.

### Figuring out The Resume Parsing
Initially, we aimed to use OCR technology to parse information out of the resume the user uploads. This involved researching various services, such as Eden AI, and countless GitHub repositories that would hopefully address our needs. However, we didn’t find any of these solutions satisfactory, as none of them provided an easy way of sending a PDF file as an API request to an OCR service. When all hope seemed lost, we realized that AI is completely unnecessary for this aspect of the project, and that there are already pdf parsing libraries out there that don’t require any sort of OCR or API calls to accomplish. When we implemented this, the raw text of the resume was able to be extracted in an easy, timely, and accurate manner.

## Technologies Used
`Next.js`, `TypeScript`, `Tailwind CSS`, `React.js`, `Prisma`, `tRPC`, `OpenAI API`, `Next Auth`, `ShadUI`, `Overleaf API`


