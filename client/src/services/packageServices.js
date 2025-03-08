import http from "./httpServices";

class PackageService {
  async getPackageManager() {
    const res = await http.get("api/packages/getPackageManager");
    return res.data.data;
  }
  async getPackageByCompany() {
    const res = await http.get("api/packages/getPackageByCompany");
    return res.data.data;
  }
  async postPackageTravel(data) {
    const res = await http.post("api/packages/postPackageTravel", data);
    return res.data.data;
  }
  async updatePackageTravel(data){
    const res = await http.post("api/packages/updatePackageTravel", data);
    return res.data.data;
  }
  async recommendPackage() {
    const res = await http.get("api/packages/recommendPackage");
    return res.data.data;
  }
  async recommendPackageById(id) {
    const res = await http.get(`api/packages/recommendPackage/${id}`);
    return res.data.data;
  }
  
}

export const packageService = new PackageService();
