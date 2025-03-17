import Search from "@/components/search/Search";
import { Suspense } from "react";

export default function Home() {
    return (
        <Suspense>
            <Search />
        </Suspense>
    )
}
