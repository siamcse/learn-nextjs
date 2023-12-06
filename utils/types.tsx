export type CompanyDetails = {
    data: {
        company: {
            _id: string
            name: string
            companyAddressId: string
            email: string
            phone: string
            website: string
            ein: string
            logoUrl: string
            clientId: string
            status: string
            created_at: string
            updated_at: string
            __v: number
            entityId: string
        }
        address: {
            _id: string
            country: string
            city: string
            state: string
            zip: string
            address: string
            status: string
            created_at: string
            updated_at: string
            __v: number
        }
        entity: {
            _id: string
            name: string
            entityAddressId: string
            email: string
            phone: string
            website: string
            ein: string
            logoUrl: string
            clientId: string
            status: string
            created_at: string
            updated_at: string
            __v: number
        }
        entityAddress: {
            _id: string
            country: string
            city: string
            state: string
            zip: string
            address: string
            status: string
            created_at: string
            updated_at: string
            __v: number
        }
        companyAdmin: {
            _id: string
            firstName: string
            lastName: string
            email: string
            registrationType: string
            userType: string
            status: string
            clientId: string
            isRegistered: boolean
            isVerified: boolean
            isDeleted: boolean
            lastLogin: string
            created_at: string
            updated_at: string
            __v: number
        }
        companyFee: {
            _id: string
            companyId: string
            sessionFeeRate: number
            minimumSessionFee: number
            status: string
            clientId: string
            lastActivatedAt: string
            created_at: string
            updated_at: string
            __v: number
            chargerFeeDurationType: string
            perChargerFee: number
        }
    }
}