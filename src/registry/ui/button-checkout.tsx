"use client";

import { Button } from "@base-ui/react/button";
import { ShoppingBasket } from "@gravity-ui/icons";

export default function ButtonCheckout() {
  return (
    <Button className="d-if ai-c g-2 px-3 py-2 bg-green-6 bc-green-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none h:bg-green-8 fv:ow-2 fv:oo-2 fv:oc-green-6">
      <ShoppingBasket className="w-4 h-4" />
      View Basket
    </Button>
  );
}
