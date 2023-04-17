import { ElementRef, Injectable } from "@angular/core";
import { OrderItemService } from "./order.item.service";

@Injectable({ providedIn: 'root'})

  export class UpdateCardBasketService{
    // public basket = document.getElementById('basket');
    // public basketNotify = this.basket.querySelector('span');

    constructor(private orderItemService: OrderItemService, private elementRef: ElementRef<HTMLSpanElement>) {
     }

    /**
* function for getting ordered items count.
*
* @param orderId user active order object
* @param entities one or more entities that should be added to the resource collection
* @throws error when required params are not valid or link not found by relation name
*/
getCardItemCountAndUpdateBasket(orderId: number, bascketNotify: HTMLElement) {
        this.orderItemService.getCardItemsCount(orderId)
            .subscribe((count: number) => {
                this.updateBasket(count, bascketNotify);
                console.log('Order Item Count: ' + count)
            });
    }

    /**
   * function for updating based span text
   *
   * @param order user active order object
   * @param entities one or more entities that should be added to the resource collection
   * @throws error when required params are not valid or link not found by relation name
   */
    updateBasket(orderIemCount: number, bascketNotify: any) {
        if (orderIemCount > 0) {
            bascketNotify.textContent = orderIemCount.toString();
            bascketNotify.hidden = false;
            this.animateCSS(bascketNotify, 'bounceIn', 'animate__');
        }
        // this.showSuccess();
    }

    animateCSS(element: any, animation: string, prefix: string) {
        (element, animation, prefix) => new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = element;

            node.classList.add(`${prefix}animated`, animationName);
            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd, { once: true });
        });
    }


}

function Component(arg0: { selector: string; templateUrl: string; styleUrls: string[]; }): (target: typeof UpdateCardBasketService) => void | typeof UpdateCardBasketService {
    throw new Error("Function not implemented.");
}
