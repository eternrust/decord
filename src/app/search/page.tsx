import Search from "@/components/search/Search";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
            <Search />
        </Suspense>
    )
}
