
import {Result} from '@/api/sys'
import language from '../../data/language'


let data={
    language:language
}

export function GetAppFramework(params){
    return Result(data[params.name].app)
}