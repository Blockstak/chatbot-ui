import { string, z } from "zod";
import Image from "next/image";
import { useState } from "react";
import Header from "@/comps/Header";
import Sidebar from "@/comps/Sidebar";
import Layout from "@/comps/Layout/Layout";
import withAuth from "@/comps/HOC/withAuth";

import { SubmitHandler } from "react-hook-form";
import { TextInput } from "@/comps/ui/Forms/Inputs";
import { Form, useZodForm } from "@/comps/ui/Forms/Form";

import { useGetTopicsQuery } from "@/api/chatbot/topics";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import {
  useProfileQuery,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
  useUpdatePhotoMutation,
} from "@/api/auth";
import showAlert from "@/comps/ui/Alert/Alert";
import { CiCircleRemove } from "react-icons/ci";

const schema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  old_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(256, "Password must be less than 256 characters"),
  new_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(256, "Password must be less than 256 characters"),
});

type FormData = z.infer<typeof schema>;
type MyChangeEvent = React.ChangeEvent<HTMLInputElement>;

function Profile() {
  const {
    data: profileData,
    isLoading,
    isError,
    refetch: refetchProfile,
  } = useProfileQuery();

  const { isLoading: isTopicsLoading } = useGetTopicsQuery();

  const [updateName, updateNameResults] = useUpdateNameMutation();
  const [updatePassword, updatePasswordResults] = useUpdatePasswordMutation();
  const [updatePhoto, updatePhotoResults] = useUpdatePhotoMutation();

  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("data--", data);

    if (selectedImage) {
      handlePhotoUpload();
    }
    if (
      profileData?.first_name !== data.first_name ||
      profileData?.last_name !== data.last_name
    ) {
      handleNameUpdate(data.first_name, data.last_name);
    }

    if (data.old_password && data.new_password) {
      handlePasswordUpdate(data.old_password, data.new_password);
    }
  };

  const handlePhotoUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("profile_photo", selectedImage);
      try {
        const res = await updatePhoto(formData).unwrap();

        if (res) {
          showAlert("Photo updated", "success");
          refetchProfile();
          setSelectedImage(null);
        }
      } catch (err: any) {
        showAlert(
          err?.data?.message ??
            "Something went wrong with photo. Please try again.",
          "error"
        );
      }
    }
  };

  const handleNameUpdate = async (fName: string, lName: string) => {
    try {
      const res = await updateName({
        first_name: fName,
        last_name: lName,
      }).unwrap();
      if (res) {
        refetchProfile();
        showAlert("Name updated", "success");
      }
    } catch (err: any) {
      showAlert(
        err?.data?.message ??
          "Something went wrong with name. Please try again.",
        "error"
      );
    }
  };

  const handlePasswordUpdate = async (oldPass: string, newPass: string) => {
    try {
      const res = await updatePassword({
        new_password: newPass,
        old_password: oldPass,
      }).unwrap();
      if (res) {
        refetchProfile;
        showAlert("Password updated", "success");
        form.reset({
          old_password: "",
          new_password: "",
        });
      }
    } catch (err: any) {
      showAlert(
        err?.data?.message ??
          "Something went wrong with password. Please try again.",
        "error"
      );
    }
  };

  if (isTopicsLoading) return <StaticLoader />;
  // console.log(data);

  return (
    <Layout>
      <Sidebar />
      <div className="relative md:ml-[20rem]">
        <div className="min-h-screen relative flex items-center">
          {/* <Header /> */}
          <div className="max-w-5xl py-8 bg-surface-secondary rounded-lg flex-col gap-8 flex w-full mx-auto">
            <div className="pl-8 pr-16 border-b border-gray-400 gap-8 inline-flex">
              <div className="p-2.5 border-b-4 border-indigo-200 items-center gap-4 flex">
                <div className="text-indigo-200 text-xl font-medium">
                  General
                </div>
              </div>
            </div>

            <div className="px-12 gap-12 grid grid-cols-3 ">
              <div className="col-span-1 ">
                {selectedImage && (
                  <div className="flex-col items-center gap-4 inline-flex relative">
                    <Image
                      width={176}
                      height={176}
                      alt="Selected image"
                      src={URL.createObjectURL(selectedImage)}
                      className="object-cover object-center rounded-full aspect-square"
                    />

                    <button
                      className="absolute bottom-0 right-4 z-[100] rounded-full bg-surface-secondary"
                      onClick={() => setSelectedImage(null)}
                    >
                      <CiCircleRemove className="text-red-500 text-4xl font-bold" />
                    </button>
                  </div>
                )}

                {!selectedImage && (
                  <>
                    <div className="flex flex-col justify-center items-center relative gap-y-2  ">
                      <Image
                        width={176}
                        height={176}
                        alt="Profile Image"
                        className="rounded-full"
                        src={
                          profileData?.profile?.profile_photo
                            ? `${profileData?.profile?.profile_photo}`
                            : "https://via.placeholder.com/176x176"
                        }
                      />

                      <label
                        htmlFor="upload-logo"
                        className="cursor-pointer items-center gap-1.5 inline-flex"
                      >
                        <HiOutlineDocumentArrowUp className="text-white w-5 h-5" />

                        <div className="text-gray-50 text-lg font-semibold leading-relaxed">
                          Replace your Photo
                        </div>
                      </label>

                      <input
                        type="file"
                        id="upload-logo"
                        accept="image/*"
                        className="hidden absolute cursor-pointer"
                        onChange={(event: MyChangeEvent) => {
                          setSelectedImage(
                            event?.target?.files && event?.target?.files[0]
                          );
                        }}
                      />
                    </div>
                    {imageError && (
                      <span className="text-sm text-red-500 mt-4">
                        {imageError}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="col-span-2  border-l">
                <Form
                  form={form}
                  onSubmit={onSubmit}
                  className="flex-col gap-8 flex md:pl-8"
                >
                  <div className="px-4 w-full">
                    <TextInput
                      label="First Name"
                      placeholder="Jane"
                      labelDirection="left"
                      defaultValue={profileData?.first_name}
                      {...form.register("first_name")}
                    />
                  </div>

                  <div className="px-4 w-full">
                    <TextInput
                      label="Last Name"
                      placeholder="Doe"
                      labelDirection="left"
                      defaultValue={profileData?.last_name}
                      {...form.register("last_name")}
                    />
                  </div>

                  <div className="px-4 w-full ">
                    <TextInput
                      type="password"
                      label="Old Password"
                      labelDirection="left"
                      placeholder="*********"
                      {...form.register("old_password")}
                    />
                  </div>
                  <div className="px-4 w-full">
                    <TextInput
                      type="password"
                      label="New Password"
                      labelDirection="left"
                      placeholder="*********"
                      {...form.register("new_password")}
                    />
                  </div>
                </Form>
              </div>
            </div>
            <div className="self-stretch h-24 pr-16 border-t border-gray-400 justify-end items-end gap-8 inline-flex">
              <button className="px-4 py-3 rounded-lg border border-gray-400 justify-center items-center gap-4 flex">
                <span className="text-gray-200 text-lg font-medium">
                  Cancel
                </span>
              </button>
              <button
                onClick={() => onSubmit(form.getValues())}
                className="transition-colors duration-200 ease-in-out hover:bg-daisy-bush-500 px-4 py-3 bg-daisy-bush-400 rounded-lg justify-center items-center gap-4 flex"
              >
                <span className="text-gray-50 text-lg font-medium">
                  Save Changes
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Profile);
