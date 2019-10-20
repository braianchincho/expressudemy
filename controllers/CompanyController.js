const companyModel = require('../models/companyModel');
class CompanyController {

    async getAllCompanies(req,res) {
        const companies= await companyModel.find();
        if(companies) {
           return res.send(companies);
        } else {
           return res.status(404).send('No se encontraron el compañias');
        }
    }

    async getCompanyById(req,res) {
        const { id } = req.params;
        const Company = await companyModel.findById(id);
        if(Company) {
           return res.send(Company);
        } else {
           return res.status(404).send('No se encontro el compañia');
        }
    }

    async saveCompany(req,res) {
        const CompanyBody = req.body;
        const Company = new companyModel(CompanyBody);
        const result = await Company.save();
        if(result) {
            return res.send(result);
        } else {
            return res.status(409).send('Error al guardar');
        }
   
    }
    
    async updateCompany(req,res) {
        const result = await companyModel.findByIdAndUpdate(
            req.params.id , req.body , {new:true});
        if(result) {
            return res.send(result);
        } else {
            return res.status(404).send('No se encontro el compañia');
        }
    }

    async deleteCompany(req,res) {
        const result = await companyModel.findByIdAndDelete(req.params.id)
        if(result) {
            return res.send(result);
        } else {
            return res.status(404).send('No se encontro el compañia');
        }
    }
}

module.exports = new CompanyController();