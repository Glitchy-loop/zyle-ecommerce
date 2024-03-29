import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

type BreadCrumbType = {
  title: string | any
  link: string
}

type BreadCrumbPropsType = {
  items: BreadCrumbType[]
  root: string
}

export default function BreadCrumb({ items, root }: BreadCrumbPropsType) {
  return (
    <div className="my-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href={`/${root.toLowerCase()}`}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {root}
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={index}>
          <ChevronRightIcon className="h-4 w-4" />
          <Link
            href={item.link}
            className={cn(
              "font-medium",
              index === items.length - 1
                ? "text-foreground pointer-events-none"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}
