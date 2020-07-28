export interface FdzTabsModel {
  activeIndex: number;
  tabs: Array<FdzTabModel>;
}

export interface FdzTabModel {
  iconClass?: string;
  name: string;
}
