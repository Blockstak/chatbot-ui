import { z } from "zod";
import Image from "next/image";
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

const schema = z.object({
  contact: z.string().min(1),
  address: z.string().min(1),
  last_name: z.string().min(1),
  first_name: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

function Home() {
  const { isLoading } = useGetTopicsQuery();

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {};

  if (isLoading) return <StaticLoader />;

  return (
    <Layout>
      <Sidebar />
      <div className="relative md:ml-[20rem]">
        <div className="min-h-screen relative">
          <Header />
          <div className="max-w-5xl py-8 bg-neutral-900 rounded-lg flex-col gap-8 flex w-full mx-auto">
            <div className="pl-8 pr-16 border-b border-gray-400 gap-8 inline-flex">
              <div className="p-2.5 border-b-4 border-indigo-200 items-center gap-4 flex">
                <div className="text-indigo-200 text-xl font-medium">
                  General
                </div>
              </div>
            </div>

            <div className="px-16 gap-12 inline-flex divide-x-[1px]">
              <div className="flex-col items-center gap-4 inline-flex">
                <Image
                  width={176}
                  height={176}
                  alt="Profile Image"
                  className="rounded-full"
                  src="https://via.placeholder.com/172x172"
                />
                <div className="items-center gap-1.5 inline-flex">
                  <HiOutlineDocumentArrowUp className="text-white w-5 h-5" />

                  <div className="text-gray-50 text-lg font-semibold leading-relaxed">
                    Replace your Photo
                  </div>
                </div>
              </div>

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
                    {...form.register("first_name")}
                  />
                </div>

                <div className="px-4 w-full">
                  <TextInput
                    label="Last Name"
                    placeholder="Doe"
                    labelDirection="left"
                    {...form.register("last_name")}
                  />
                </div>

                <div className="px-4 w-full">
                  <TextInput
                    label="Address"
                    labelDirection="left"
                    placeholder="Street, City"
                    {...form.register("address")}
                  />
                </div>

                <div className="px-4 w-full">
                  <TextInput
                    label="Contact"
                    labelDirection="left"
                    placeholder="01XXXXXXXXX"
                    {...form.register("contact")}
                  />
                </div>
              </Form>
            </div>
            <div className="self-stretch h-24 pr-16 border-t border-gray-400 justify-end items-end gap-8 inline-flex">
              <div className="w-48 h-14 p-2.5 rounded-lg border border-gray-400 justify-center items-center gap-4 flex">
                <div className="text-gray-200 text-lg font-medium">Cancel</div>
              </div>
              <div className="w-48 h-14 p-2.5 bg-indigo-400 rounded-lg justify-center items-center gap-4 flex">
                <div className="text-gray-50 text-lg font-medium">
                  Save Changes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Home);
