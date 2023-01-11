import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  // Modales
  @ViewChild("modal_order", { static: false }) modal_order;
  @ViewChild("modal_num_order", { static: false }) modal_num_order;

  constructor(
    private modalService: NgbModal,
    public orderService: OrderService
  ) { }

  openModalOrder() {
    this.modalService.open(this.modal_order, { windowClass: "my-modal-dialog" }).result.then(result => {
      // Si hemos pulsado el boton de hacer pedido, crearemos el pedido
      if (result === 'yes') {
        console.log("Vamos a crear el pedido");
        // Creo el pedido desde el servicio
        this.orderService.createOrder().subscribe(data => {
          console.log("se ha creado el objeto ", data);
          // Limpio la orden
          this.orderService.clearOrder();

          // Abro el modal para mostrar el numero de pedido
          this.modalService.open(this.modal_num_order);

        }, error => {
          console.log("Ha habido un error: " + error);
        })

      } else {
        console.log("Se ha cancelado el pedido");

      }
    })
  }


}
