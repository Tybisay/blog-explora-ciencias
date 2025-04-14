'use client';

import {getBlogPost} from '@/services/blog';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';
import {useEffect, useState} from 'react';

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    status: 'publish' | 'draft';
  };
}

export default function BlogPostPage({params, searchParams}: Props) {
  const {id} = params;
  const {status} = searchParams;
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const post = await getBlogPost(id);
      setBlogPost(post);
    };

    fetchBlogPost();
  }, [id]);

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  const formatContent = (content: string) => {
    const sections = content.split('\n\n');
    return sections.map((section, index) => {
      if (section.startsWith('1.')) {
        return (
          <div key={index}>
            <h1 className="text-3xl font-semibold mb-4">{section}</h1>
          </div>
        );
      } else if (section.startsWith('2.')) {
        return (
          <div key={index}>
            <h1 className="text-3xl font-semibold mb-4">{section}</h1>
          </div>
        );
      }
        else if (section.startsWith('3.')) {
          return (
            <div key={index}>
              <h1 className="text-3xl font-semibold mb-4">{section}</h1>
            </div>
          );
      }
       else if (section.includes('Métodos de evaluación de usabilidad:')) {
        return (
          <div key={index}>
            <h2 className="text-2xl font-semibold mb-2">{section}</h2>
          </div>
        );
      } else if (section.includes('Aspectos específicos y métricas para evaluar la experiencia del usuario:')) {
        return (
          <div key={index}>
            <h2 className="text-2xl font-semibold mb-2">{section}</h2>
          </div>
        );
      } else if (section.includes('Indicadores clave:')) {
        return (
          <div key={index}>
            <h2 className="text-2xl font-semibold mb-2">{section}</h2>
          </div>
        );
      } else if (section.includes('Aspectos críticos a evaluar:')) {
        return (
          <div key={index}>
            <h2 className="text-2xl font-semibold mb-2">{section}</h2>
          </div>
        );
      }
      else if (section.startsWith('Pruebas de usuario (User Testing):')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Evaluación Heurística:')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Pruebas de prototipos de baja fidelidad y wireframes:')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Navegación e Interacción:')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Satisfacción del Usuario:')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Accesibilidad y Rendimiento:')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Mejora en el rendimiento académico:')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Incremento en el compromiso y la participación:')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Satisfacción y autoeficacia de los estudiantes:')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Rendimiento (Response Time, Escalabilidad y Estabilidad):')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Seguridad (Protección de datos, Integridad de la información y prevención de ataques):')) {
        return (
          <div key={index}>
            <h3 className="text-xl font-semibold">{section}</h3>
          </div>
        );
      }
      else if (section.startsWith('Recomendaciones de pruebas:')) {
        return (
          <div key={index}>
            <h2 className="text-2xl font-semibold mb-2">{section}</h2>
          </div>
        );
      } else {
        return (
          <p key={index}>{section}</p>
        );
      }
    });
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{blogPost.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={`https://picsum.photos/id/${blogPost.id}/800/600`}
            alt={blogPost.title}
            width={800}
            height={600}
            className="rounded-md mb-4"
          />
          <div>{formatContent(blogPost.content)}</div>
          <p>Author: {blogPost.author}</p>
          <p>Date: {blogPost.date}</p>
          <p>Status: {status}</p>
        </CardContent>
      </Card>
    </div>
  );
}
