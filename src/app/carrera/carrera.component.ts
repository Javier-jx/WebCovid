import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from '../auth/services/firebase-service.services1';
import { isNullOrUndefined } from 'util';





@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css'],
})
export class CarreraComponent implements OnInit {

  closeResult = '';

  carreraForm: FormGroup;

  idFirabaseActualizar: string;
  actualizar: boolean;


  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private firebaseServiceService: FirebaseServiceService,

  ) { }

  config: any;
  collection = { count: 0, data: [] };

  ngOnInit(): void {
    this.idFirabaseActualizar = '';
    this.actualizar = false;

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

    this.carreraForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      edificio: ['', Validators.required],
      salon: ['', Validators.required],
    });

    this.firebaseServiceService.getCarreras().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          nombre: e.payload.doc.data().nombre,
          edificio: e.payload.doc.data().edificio,
          salon: e.payload.doc.data().salon,


          idFirebase: e.payload.doc.id
        };
      });
    },
      error => {
        console.error(error);
      }
    );
  }


  // tslint:disable-next-line:typedef
  pageChanged(event) {
    this.config.currentPage = event;
  }

  eliminar(item: any): void {
    this.firebaseServiceService.deleteCarrera(item.idFirebase);
  }

  guardarCarrera(): void {
    this.firebaseServiceService.createCarrera(this.carreraForm.value).then(resp => {
      this.carreraForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error);
    });
  }

  // tslint:disable-next-line:typedef
  actualizarCarrera() {
    if (!isNullOrUndefined(this.idFirabaseActualizar)){
      this.firebaseServiceService.updateCarrera(this.idFirabaseActualizar, this.carreraForm.value).then(resp => {
        this.carreraForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      });
        }
    }


  // tslint:disable-next-line:typedef
  openEditar(content, item: any) {
    this.carreraForm.setValue({
      id: item.id,
      nombre: item.nombre,
      edificio: item.edificio,
      salon: item.salon,
    });
    this.idFirabaseActualizar = item.idFirebase;
    this.actualizar = true;


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  // tslint:disable-next-line:typedef
  open(content) {
    this.actualizar = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
