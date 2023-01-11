import * as _ from 'lodash';
import { IProduct } from '../interfaces/iproduct';

export class Product implements IProduct {

  constructor(data) {
    _.set(this, 'data', data);
  }

  get price(): number {
    return _.get(this, 'data.price');
  }

  get extras(): any[] {
    return _.get(this, 'data.extras');
  }

  get name(): string{
    return _.get(this, 'data.name');
  }

  get img(): string{
    return _.get(this, 'data.img');
  }

  get quantity(): number{
    return _.get(this, 'data.quantity');
  }

  set quantity(value: number) {
    _.set(this, 'data.quantity', value);
  }

  getExtras() {

        const extras = [];
        // Recorro los extras
        _.forEach(this.extras, extra => {
            const products = extra.products;
            // Recorro los subproductos
            _.forEach(products, product => {
                // Si existe el campo optionSelected
                if (product.optionSelected) {
                    extras.push({
                        "name": product.name,
                        "selected": product.optionSelected.name
                    })
                    // Si existe el campo activate
                } else if (product.options[0].activate) {
                    extras.push({
                        "name": product.name
                    })
                }
            });
        });
        return extras;

  }

  totalPrice() {

        // Empezamos con el precio del propio producto
        let total = this.price;

        // Sumo el precio de los extras, sino tiene, no pasa por este bucle
        _.forEach(this.extras, extra => {
            const products = extra.products;
            _.forEach(products, product => {
                // Si existe el campo optionSelected
                if (product.optionSelected) {
                    total += product.optionSelected.price;
                    // Si existe el campo activate
                } else if (product.options[0].activate) {
                    total += product.options[0].price;
                }
            });
        });

        return total;

  }
}
