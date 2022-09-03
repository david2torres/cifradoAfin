import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cifradoAfin';
  public a!: number;
  public b!: number;
  public n: number = 0;
  public textACifrar = ""
  public textValid = ""
  public encyptMessage: String = '';
  public encryptMessageT = ''
  public mensajeError: string = "";
  public showError = false;
  public decryptMessage2: any;
  public mcd: any;
  public i!: number;

  public abecedario = new Map<string, number>([
    ["a", 0], ["b", 1], ["c", 2], ["d", 3], ["e", 4], ["f", 5], ["g", 6],
    ["h", 7], ["i", 8], ["j", 9], ["k", 10], ["l", 11], ["m", 12], ["n", 13],
    ["ñ", 14], ["o", 15], ["p", 16], ["q", 17], ["r", 18], ["s", 19], ["t", 20],
    ["u", 21], ["v", 22], ["w", 23], ["x", 24], ["y", 25], ["z", 26]
  ]);
  content: any = [];;

  constructor() {
    this.n = this.abecedario.size;
  }

  encriptar(a: number, b: number) {
    this.a = a;
    this.b = b;
    this.adjustText(this.textACifrar);
    this.validateCoprimos();
  }

  adjustText(text?: any) {
    this.textValid = text.replace(/[^a-zñvÑV]/ig, "");
    this.textValid = this.textValid.toLowerCase();
  }

  validateCoprimos() {
    this.maximoComunDivisor(this.a, this.n)
    this.mcd === 1 ? this.encrypt() : this.viewError();
  }

  encrypt() {
    if (this.a >= 0 && this.b <= this.n) {
      let contains: any;
      let encyptMessage: any = [];
      for (const iterator of this.textValid) {
        contains = this.abecedario.get(iterator);
        let newLetter = ((this.a * contains) + this.b) % this.n;
        for (const iterator2 of this.abecedario.entries()) {
          if (iterator2[1] == newLetter) {
            encyptMessage.push(iterator2[0])
          }
        }
      }
      this.encyptMessage = String(encyptMessage).split(',').join('');
    } else {
      this.viewError()
    }
  }

  maximoComunDivisor(a: number, b: number): any {

    if (b == 0) return this.mcd = a
    return this.mcd = this.maximoComunDivisor(b, a % b);
  }

  viewError() {
    this.showError = true
    if (this.mcd == 1) {
      this.mensajeError = "Los numeros a y n no son coprimos"
    }
    if (this.a <= 0) {
      this.mensajeError = "La Constante Decimación (A) debe ser mayor a Cero"
    } else if (this.b >= this.n) {
      this.mensajeError = "La Constante Desplazamiento (B) no puede ser mayor que n = 27"
    }
  }

  closeError() {
    this.showError = false
  }

  //Desencriptar

  decryptText() {

    this.decryptMessage2 = ' '
    this.content = []
    this.adjustText(this.encryptMessageT);
    this.calculateInverso();
  }

  calculateInverso() {
    for (const iterator2 of this.abecedario.entries()) {
      if (((this.a * iterator2[1]) % this.n) == 1) {
        this.i = iterator2[1]
      }
    }
    this.decryptMessage();
  }

  decryptMessage() {
    let decryptMessage: any = [];
    let newLetter;
    let contains: any;
    let preModulo: any;
    for (const iterator of this.textValid) {
      contains = this.abecedario.get(iterator);
      preModulo = (this.i * (contains - this.b))

      if (preModulo < 0) {
        do {
          preModulo += this.n;
        } while (preModulo < 0);
      }
      newLetter = (preModulo % this.n)
      decryptMessage = this.asignLetter(newLetter)
      this.decryptMessage2 = String(decryptMessage).split(',').join('');
    }
  }

  asignLetter(newLetter: any) {

    for (const iterator2 of this.abecedario.entries()) {
      if (iterator2[1] == newLetter) {
        this.content.push(iterator2[0])
      }
    }
    return this.content;
  }
}

