import Write from "@/components/blog/BlogWrite";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
            <Write />
        </Suspense>
    )
}
