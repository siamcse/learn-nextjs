import axios from "axios";
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export function getManufucturer() {
    return axios.get(`http://192.168.0.186:3004/charger/65685b405968894bc209a0f3`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export function getChargerModel(id: any) {
    return axios.get(`http://192.168.0.186:3004/charger-model?manufacturerId=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}