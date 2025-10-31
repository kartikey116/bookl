import { useEffect, useState } from "react";
import ExperienceCard from "../components/ExperienceCard";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import { fetchExperiences } from "../api/mockApi";
import { api } from "../api/apiClient";
import type { Experience } from "../types/index.ts";

export default function Home() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api.get("/experiences")
      .then((res) => {
        setItems(res.data.map((e: any) => ({ id: e._id || e.id, title: e.title, location: e.location, price: e.price, image: e.imageUrl || e.image })));
      })
      .catch(() => fetchExperiences().then((d) => setItems(d)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingPlaceholder />;

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((e) => (
          <ExperienceCard key={e.id} {...e} />
        ))}
      </div>
    </section>
  );
}
