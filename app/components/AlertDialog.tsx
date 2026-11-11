"use client"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { JobRow } from "../dashboard/recruiter/jobs/page"
import { useState } from "react"
import { deleteJob } from "@/lib/actions/jobs"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"

export function AlertDialoge({ job }: { job: JobRow }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleDelete = async (jobId: string) => {
    const result = await deleteJob(jobId)
    console.log("delete job", result)
    if (result.deletedCount) {
      setOpen(false)
      toast.add({
        title: "Job deleted",
      })
      router.refresh()
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
      className=""
        render={
          <Button variant="destructive">
            <Trash2Icon className="size-4" />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon/>
          </AlertDialogMedia>
          {/* <AlertDialogTrigger render={<Button variant="destructive" />}>
            Delete
          </AlertDialogTrigger> */}
          <AlertDialogDescription>
            This will permanently delete this chat conversation. View{" "}
            <a href="#">Settings</a> delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(job._id)}
            variant="destructive"
          >
            <Trash2Icon className="size-4" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
