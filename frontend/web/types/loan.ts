// To parse this data:
//
//   import { Convert, Loan } from "./file";
//
//   const loan = Convert.toLoan(json);

export interface Loan {
    id:                                    number;
    ask_amount:                            string;
    ask_amount_currency:                   string;
    collateral_approximate_worth:          string;
    collateral_approximate_worth_currency: string;
    scanned_collateral_documents:          string;
    collateral_images_or_video:            string;
    financial_statements:                  string;
    description:                           string;
    suggested_payment_plan:                string;
    status:                                string;
    loan_instituition:                     string;
    company_details:                       CompanyDetails;
    user_data:                             UserData;
}

export interface CompanyDetails {
    registered_company_name:              string;
    business_registration_number:         string;
    scanned_certificate_of_incorporation: string;
    company_tax_identification_number:    string;
    company_address:                      string;
    business_sector:                      string;
    business_model:                       string;
    number_of_employees:                  number;
    individual_company_id_number:         string;
    scanned_company_id_document:          string;
    company_logo:                         string;
}

export interface UserData {
    first_name:                               string;
    last_name:                                string;
    email:                                    string;
    contact:                                  string;
    individual_profile_picture:               string;
    individual_national_id_or_passport:       null;
    scanned_national_id_or_passport_document: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toLoan(json: string): Loan {
        return JSON.parse(json);
    }

    public static loanToJson(value: Loan): string {
        return JSON.stringify(value);
    }
}
