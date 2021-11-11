import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from '../auth/services/firebase-service.services';
import { isNullOrUndefined } from 'util';





@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css'],
})
export class SintomasComponent implements OnInit {

  closeResult = '';

  sintomaForm: FormGroup;

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

    this.sintomaForm = this.fb.group({
      id: ['', Validators.required],
      pregunta: ['', Validators.required],
    });

    this.firebaseServiceService.getSintomas().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          pregunta: e.payload.doc.data().pregunta,


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
    this.firebaseServiceService.deleteSintoma(item.idFirebase);
  }

  guardarSintoma(): void {
    this.firebaseServiceService.createSintoma(this.sintomaForm.value).then(resp => {
      this.sintomaForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error);
    });
  }

  // tslint:disable-next-line:typedef
  actualizarSintoma() {
    if (!isNullOrUndefined(this.idFirabaseActualizar)){
      this.firebaseServiceService.updateSintoma(this.idFirabaseActualizar, this.sintomaForm.value).then(resp => {
        this.sintomaForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      });
        }
    }


  // tslint:disable-next-line:typedef
  openEditar(content, item: any) {
    this.sintomaForm.setValue({
      id: item.id,
      pregunta: item.pregunta,
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
