import React from 'react';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { Locale } from '../../../types';
import { getLocalizedContent } from '../../../lib/i18n';
import { getProducts } from '../../../lib/sanity';

interface StorePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function StorePage({ params }: StorePageProps) {
  const { locale } = await params;
  const products = await getProducts(locale);

  return (
    <Layout locale={locale}>
      {/* Hero Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {getLocalizedContent({
              en: 'School Store',
              ar: 'متجر المدرسة',
              fr: 'Magasin de l\'École',
              lg: 'Dduka ly\'Essomero'
            }, locale)}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {getLocalizedContent({
              en: 'Purchase school uniforms, books, and supplies for your child',
              ar: 'اشتري الزي المدرسي والكتب واللوازم لطفلك',
              fr: 'Achetez des uniformes scolaires, des livres et des fournitures pour votre enfant',
              lg: 'Gula engoye z\'essomero, ebitabo, n\'ebikozesebwa by\'omwana wo'
            }, locale)}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-64">
                  <Image
                    src={product.productImage}
                    alt={getLocalizedContent(product.productName, locale)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {getLocalizedContent(product.productName, locale)}
                    </h3>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {getLocalizedContent(product.category, locale)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {getLocalizedContent(product.description, locale)}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-800">
                      UGX {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {getLocalizedContent({
                        en: `${product.stockQuantity} in stock`,
                        ar: `${product.stockQuantity} متوفر`,
                        fr: `${product.stockQuantity} en stock`,
                        lg: `${product.stockQuantity} mu sitoko`
                      }, locale)}
                    </span>
                  </div>
                  
                  <button className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    {getLocalizedContent({
                      en: 'Add to Cart',
                      ar: 'أضف إلى السلة',
                      fr: 'Ajouter au Panier',
                      lg: 'Yongera mu Kkaadi'
                    }, locale)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getLocalizedContent({
                en: 'Payment Methods',
                ar: 'طرق الدفع',
                fr: 'Méthodes de Paiement',
                lg: 'Engeri z\'Okusasula'
              }, locale)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {getLocalizedContent({
                  en: 'Mobile Money',
                  ar: 'الأموال المحمولة',
                  fr: 'Argent Mobile',
                  lg: 'Ssente za Simu'
                }, locale)}
              </h3>
              <p className="text-gray-600">
                {getLocalizedContent({
                  en: 'Pay with MTN or Airtel Money',
                  ar: 'ادفع بـ MTN أو Airtel Money',
                  fr: 'Payez avec MTN ou Airtel Money',
                  lg: 'Sasula na MTN oba Airtel Money'
                }, locale)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {getLocalizedContent({
                  en: 'Bank Transfer',
                  ar: 'التحويل المصرفي',
                  fr: 'Virement Bancaire',
                  lg: 'Okusindika Ssente mu Bbanka'
                }, locale)}
              </h3>
              <p className="text-gray-600">
                {getLocalizedContent({
                  en: 'Direct bank transfer available',
                  ar: 'التحويل المصرفي المباشر متاح',
                  fr: 'Virement bancaire direct disponible',
                  lg: 'Okusindika ssente mu bbanka butereevu'
                }, locale)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {getLocalizedContent({
                  en: 'Online Payment',
                  ar: 'الدفع عبر الإنترنت',
                  fr: 'Paiement en Ligne',
                  lg: 'Okusasula ku Mukutu'
                }, locale)}
              </h3>
              <p className="text-gray-600">
                {getLocalizedContent({
                  en: 'Secure online payment via Flutterwave',
                  ar: 'دفع آمن عبر الإنترنت عبر Flutterwave',
                  fr: 'Paiement en ligne sécurisé via Flutterwave',
                  lg: 'Okusasula ku mukutu okutegeerekeka nga tuyita ku Flutterwave'
                }, locale)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Orders */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {getLocalizedContent({
              en: 'Need Help with Your Order?',
              ar: 'تحتاج مساعدة في طلبك؟',
              fr: 'Besoin d\'aide avec votre commande?',
              lg: 'Weetaaga obuyambi ku kyagule kyo?'
            }, locale)}
          </h2>
          <p className="text-xl mb-8">
            {getLocalizedContent({
              en: 'Contact us for assistance with orders, sizing, or delivery',
              ar: 'اتصل بنا للمساعدة في الطلبات أو المقاسات أو التوصيل',
              fr: 'Contactez-nous pour de l\'aide avec les commandes, les tailles ou la livraison',
              lg: 'Tusisinkane okufuna obuyambi ku byagule, obunene, oba okutuusa'
            }, locale)}
          </p>
          <div className="space-y-2">
            <p className="text-lg">📧 buddaislamicjuniorschool@gmail.com</p>
            <p className="text-lg">📞 +256 700 123 456</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
    { locale: 'fr' },
    { locale: 'lg' },
  ];
}
