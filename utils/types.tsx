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

export type CreateCompany = {
    companyName: string,
    email: string,
    phone: string,
    country: string,
    zip: number,
    city: string,
    address: string,
    state: string
}

export type SingleCompanyType = {
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
            entityId: any
            acc_customerId: string
            acc_vendorId: string
            invoiceGenerated: any
            status: string
            created_at: string
            updated_at: string
            __v: number
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
        entity: any
        entityAddress: any
        companyAdmin: any
        companyFee: any
    }
}

export type ManufacturerType = {
    data: {
        _id: string
        name: string
        clientId: string
        chargerId: string
        address: string
        description: string
        contact: string
        status: string
        created_at: string
        updated_at: string
        __v: number
    }
}
export type ChargerType = {
    _id: string
    name: string
    clientId: string
    chargerId: string
    address: string
    description: string
    contact: string
    status: string
    created_at: string
    updated_at: string
    __v: number
}

export type ModelType = {
    _id: string
    name: string
    modelCode?: string
    input?: string
    output?: string
    communicationType?: string
    isMeterVIChangeable?: string
    features?: string[]
    connectivity?: string[]
    mount?: string[]
    manufacturerId: string
    clientId: string
    maxPower: any
    status: string
    created_at: string
    updated_at: string
    __v: number
    triggerType?: string
    TriggerType?: string
    maxPowerType?: string
}


export type ChargerInformation = {
    model: {
        label: string,
        value: string
    },
    manufacturer: {
        label: string,
        value: string
    },
    // manufacturerId: string,
    // modelId: string,
}