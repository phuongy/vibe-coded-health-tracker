import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Health Tracker" },
    { name: "description", content: "Welcome to Health Tracker!" },
  ];
};

export const loader: LoaderFunction = async () => {
  return redirect("/dashboard");
};

export default function Index() {
  return null;
}


