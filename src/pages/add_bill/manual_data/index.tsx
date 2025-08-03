import { Card, CardContent } from "@/components/ui/card";
import { UpdateDataForm } from "@/components/dashboard/add_bill";

export default function UploadDocumentPage() {
    return (
        <>
            <h2 className="text-lg font-medium text-[#8770BC] ml-10">Enter Manual Data</h2>
            <Card className="max-w-xl mx-auto mt-10 border-gray-300">
                <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">Enter Data</h3>
                    <hr className="mb-4 border-gray-200" />
                    <UpdateDataForm />
                </CardContent>
            </Card>
        </>
    );
}
