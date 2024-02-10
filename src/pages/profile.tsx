import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { data: sessionData } = useSession();
  const utils = api.useUtils();

  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    timeframe: "",
  });
  const educations = api.education.getUserEducation.useQuery();
  const createEducationMutation = api.education.create.useMutation({
    onSuccess: () => utils.education.invalidate(),
  });
  const deleteEducationMutation = api.education.delete.useMutation({
    onSuccess: () => utils.education.invalidate(),
  });

  const [newExperience, setNewExperience] = useState({
    company: "",
    role: "",
    timeframe: "",
    location: "",
    description: "",
  });
  const experiences = api.experience.getUserExperience.useQuery();
  const createExperienceMutation = api.experience.create.useMutation({
    onSuccess: () => utils.experience.invalidate(),
  });
  const deleteExperienceMutation = api.experience.delete.useMutation({
    onSuccess: () => utils.experience.invalidate(),
  });

  return (
    <>
      <h1 className="my-8 text-center text-4xl font-semibold">
        Profile Information
      </h1>
      <h2 className="mx-auto px-2 text-2xl text-blue-800 dark:text-blue-200 md:w-11/12">
        Metadata
      </h2>
      <div className="mx-auto grid w-full grid-cols-1 gap-4 px-2 md:w-11/12 lg:grid-cols-2 2xl:grid-cols-3">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="name">
            Name
          </Label>
          <Input type="text" id="name" placeholder="FirstName LastName" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="location">
            Location
          </Label>
          <Input type="text" id="location" placeholder="City, State" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="email">
            Email
          </Label>
          <Input type="email" id="email" placeholder="email@email.com" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="phone">
            Phone
          </Label>
          <Input type="tel" id="phone" placeholder="+1" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="linkedin">
            LinkedIn
          </Label>
          <Input
            type="url"
            id="linkedin"
            placeholder="https://www.linkedin.com/in/"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="github">
            GitHub
          </Label>
          <Input type="url" id="github" placeholder="https://github.com/" />
        </div>
      </div>
      <div className="mx-auto mt-4 px-2 md:w-11/12">
        <Button variant="success">Save changes</Button>
      </div>
      <div className="mx-auto mt-8 px-2 md:w-11/12">
        <h2 className="text-2xl text-blue-800 dark:text-blue-200">Education</h2>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="success">+ Add Eduction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Education</DialogTitle>
                <DialogDescription>
                  Add the details of your education here
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="education_school" className="text-right">
                    School
                  </Label>
                  <Input
                    id="education_school"
                    value={newEducation.school}
                    onChange={(newSchool) =>
                      setNewEducation({
                        ...newEducation,
                        school: newSchool.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="education_degree" className="text-right">
                    Degree
                  </Label>
                  <Input
                    id="education_degree"
                    value={newEducation.degree}
                    onChange={(newDegree) =>
                      setNewEducation({
                        ...newEducation,
                        degree: newDegree.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="education_timeframe" className="text-right">
                    Timeframe
                  </Label>
                  <Input
                    id="education_timeframe"
                    value={newEducation.timeframe}
                    onChange={(newTimeframe) =>
                      setNewEducation({
                        ...newEducation,
                        timeframe: newTimeframe.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={() => createEducationMutation.mutate(newEducation)}
                  >
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {educations.data && (
            <>
              {educations.data.map((element) => (
                <div className="flex w-full flex-row justify-between rounded-xl bg-blue-200 p-4 dark:bg-blue-800">
                  <div>
                    <h3 className="text-xl font-semibold">{element.school}</h3>
                    <h4 className="font-light">{element.degree}</h4>
                  </div>
                  <div className="my-auto flex h-full gap-4">
                    <Button variant="destructive" size="icon">
                      <Trash2
                        className="h-4 w-4"
                        onClick={() =>
                          deleteEducationMutation.mutate({ id: element.id })
                        }
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="mx-auto mt-8 px-2 md:w-11/12">
        <h2 className="text-2xl text-blue-800 dark:text-blue-200">
          Experience
        </h2>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="success">+ Add Experience</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Experience</DialogTitle>
                <DialogDescription>
                  Add the details of your experience here
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience_company" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="experience_company"
                    value={newExperience.company}
                    onChange={(newCompany) =>
                      setNewExperience({
                        ...newExperience,
                        company: newCompany.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience_role" className="text-right">
                    Role
                  </Label>
                  <Input
                    id="experience_role"
                    value={newExperience.role}
                    onChange={(newRole) =>
                      setNewExperience({
                        ...newExperience,
                        role: newRole.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience_timeframe" className="text-right">
                    Timeframe
                  </Label>
                  <Input
                    id="experience_timeframe"
                    value={newExperience.timeframe}
                    onChange={(newTimeframe) =>
                      setNewExperience({
                        ...newExperience,
                        timeframe: newTimeframe.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience_location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="experience_location"
                    value={newExperience.location}
                    onChange={(newLocation) =>
                      setNewExperience({
                        ...newExperience,
                        location: newLocation.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <Label htmlFor="experience_description">Description</Label>
                <Textarea
                  id="experience_textarea"
                  value={newExperience.description}
                  onChange={(newDescription) =>
                    setNewExperience({
                      ...newExperience,
                      description: newDescription.target.value,
                    })
                  }
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={() =>
                      createExperienceMutation.mutate(newExperience)
                    }
                  >
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {experiences.data && (
            <>
              {experiences.data.map((element) => (
                <div className="flex w-full flex-row justify-between rounded-xl bg-blue-200 p-4 dark:bg-blue-800">
                  <div>
                    <h3 className="text-xl font-semibold">{element.company}</h3>
                    <h4 className="font-light">{element.role}</h4>
                  </div>
                  <div className="my-auto flex h-full gap-4">
                    <Button variant="destructive" size="icon">
                      <Trash2
                        className="h-4 w-4"
                        onClick={() =>
                          deleteExperienceMutation.mutate({ id: element.id })
                        }
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
