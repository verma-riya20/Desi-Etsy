import Artisans from './Artisans'; 
import ProductApproval from './ProductApproval';
//import { Tabs, Tab } from "@/components/ui/tabs"; // optional tab switch, or you can just stack them

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <Artisans />
        </div>
        <div>
          <ProductApproval/>
        </div>
      </div>
    </div>
  );
}
