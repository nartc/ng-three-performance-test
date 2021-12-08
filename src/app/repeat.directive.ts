import {
  Directive,
  Inject,
  Input,
  NgZone,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

const MAX_VALUE = 0x10000;

export interface RepeatContext {
  $implicit: number;
  isOdd: boolean;
  isEven: boolean;
  isFirst: boolean;
  isLast: boolean;
}

@Directive({
  selector: "[repeat][repeatOf]",
})
export class NgtRepeatDirective {
  @Input()
  set repeatOf(count: number) {
    const safeCount = Math.floor(Math.max(0, Math.min(count, MAX_VALUE)));
    const { length } = this.viewContainer;

    if (safeCount < length) {
      this.removeContainers(length - safeCount);
    } else {
      this.addContainers(length, safeCount);
    }
  }

  constructor(
    @Inject(ViewContainerRef) private readonly viewContainer: ViewContainerRef,
    @Inject(TemplateRef)
    private readonly templateRef: TemplateRef<RepeatContext>,
    private ngZone: NgZone
  ) {}

  private addContainers(length: number, count: number) {
    for (let index = length; index < count; index++) {
      this.viewContainer.createEmbeddedView<RepeatContext>(this.templateRef, {
        $implicit: index,
        isFirst: index === length,
        isLast: index === count - 1,
        isOdd: !(index % 2),
        isEven: !!(index % 2),
      });
    }
  }

  private removeContainers(amount: number) {
    for (let index = 0; index < amount; index++) {
      this.viewContainer.remove();
    }
  }

  static ngTemplateContextGuard(
    dir: NgtRepeatDirective,
    ctx: unknown
  ): ctx is RepeatContext {
    return true;
  }
}
