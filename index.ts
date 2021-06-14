import * as fs from "fs";
import { remove, orderBy } from "lodash";
class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);
    const contenidoDelArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelArchivo = JSON.parse(contenidoDelArchivo);
    productosDelArchivo.forEach((element) => {
      this.addProduct(element);
    });
  }
  addProduct(product: Product): void {
    this.add(product);
  }
  getProduct(id: number): Product {
    return this.cosas.find((i) => i.id === id);
  }
  removeProduct(id: number): Product {
    return remove(this.cosas, (i) => i.id === id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
