import Image from "next/image";

export type ServiceCardItem = { no: string; title: string; category: string; text: string; image: string; href: string };
export function ServiceCardList({ items }: { items: ServiceCardItem[] }) {
  const asset = (name: string) => `/sites/navercorp-65983208/service/${name}`;
  return <div className="service-card-list">{items.map((card) => <article className="service-card" key={card.no}><div className="service-card__number">{card.no}</div><div className="service-card__image"><Image src={asset(card.image)} alt="" width={896} height={1120} /></div><div className="service-card__content"><h3>{card.title}</h3><p className="category">{card.category}</p><p>{card.text}</p><a href={card.href} className="btn-basic btn-primary">자세히 보기</a></div></article>)}</div>;
}
