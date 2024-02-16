import { Code, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { codeType } from "@/vite-env";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { handleError } from "@/utils/handleError";
import { useDeleteCodeMutation } from "@/redux/slices/api";

export default function CodeItem({
  data,
  deleteBtn,
}: {
  data: codeType;
  deleteBtn: boolean;
}) {
  const [deleteCode, { isLoading }] = useDeleteCodeMutation();
  const handleDelete = async () => {
    try {
      const response = await deleteCode(data._id!).unwrap();
      console.log(response);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="p-3 rounded cursor-pointer bg-slate-900 flex justify-start items-center flex-col gap-3">
      <div className="__top flex justify-start items-start gap-3 w-full">
        <Code />
        <p className="font-mono font-bold text-lg">{data.title}</p>
      </div>
      <Separator />
      <div className="__btn_container flex gap-3">
        <Link target="_blank" to={`/compiler/${data._id}`}>
          <Button variant="secondary">Open Code</Button>
        </Link>
        {deleteBtn && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" loading={false}>
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  <Trash2 />
                  Delete Code confirmation!
                </DialogTitle>
                <div className="__url flex justify-center items-center flex-col gap-1">
                  <p>
                    Are you sure, that you want to delete this code, this action
                    is not reversible.
                  </p>
                  <Button
                    variant="destructive"
                    className="h-full"
                    onClick={handleDelete}
                    loading={isLoading}
                  >
                    Confirm Delete
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
