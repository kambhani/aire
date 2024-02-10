import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

export default function Dashboard() {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-8 px-2 md:w-11/12 lg:grid-cols-3">
      <Link href="/upload-resume">
        <Card className="h-full duration-300 hover:scale-[1.03]">
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
            <CardDescription>
              Upload your resume for processing on our server. This will let us
              parse the information and load it to your profile.
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/profile">
        <Card className="h-full duration-300 hover:scale-[1.03]">
          <CardHeader>
            <CardTitle>Edit Profile Information</CardTitle>
            <CardDescription>
              Add education, experience, and more to your profile. This will
              help our AI generate the best resume for you.
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/generate">
        <Card className="h-full duration-300 hover:scale-[1.03]">
          <CardHeader>
            <CardTitle>Generate Resume</CardTitle>
            <CardDescription>
              Generate a custom resume and cover letter based on your profile
              and job description.
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
