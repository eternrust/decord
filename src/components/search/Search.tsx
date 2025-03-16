'use client'
import { redirect, useSearchParams } from "next/navigation"

const Search = () => {
    const searchParams = useSearchParams()
    const keyword = searchParams.get('q')

    if (!keyword) redirect('/')

    return (
        <div>{keyword}</div>
    )
}

export default Search;