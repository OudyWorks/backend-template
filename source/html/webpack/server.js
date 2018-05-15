import create from './create'
import Vue from 'vue'
import loader from '../loader'

export default async context =>
    new Promise(
        (resolve, reject) => {

            let application = new Vue(loader)

            context.meta = application.$meta()

            resolve(application)

        }
    )