'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Truck,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  CheckCircle,
  Send,
  Globe,
  ClipboardList,
} from 'lucide-react';
import { Container } from '@/components/ui';
import { products } from '@/lib/data/products';

const quotationSchema = z.object({
  // Step 1: Company Info
  companyName: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  country: z.string().min(2, 'Country is required'),
  address: z.string().optional(),
  // Step 2: Products
  products: z.array(z.object({
    productId: z.string().min(1, 'Select a product'),
    quantity: z.string().min(1, 'Quantity is required'),
    packagingPreference: z.string().optional(),
    notes: z.string().optional(),
  })).min(1, 'Add at least one product'),
  // Step 3: Shipping
  shippingMethod: z.enum(['fob', 'cif', 'exw', 'dap']),
  destinationPort: z.string().min(2, 'Destination is required'),
  estimatedDate: z.string().optional(),
  specialRequirements: z.string().optional(),
});

type QuotationFormData = z.infer<typeof quotationSchema>;

const steps = [
  { id: 1, key: 'company', icon: Building2 },
  { id: 2, key: 'products', icon: Package },
  { id: 3, key: 'shipping', icon: Truck },
  { id: 4, key: 'review', icon: FileCheck },
];

const shippingMethods = [
  { value: 'fob', label: 'FOB (Free on Board)' },
  { value: 'cif', label: 'CIF (Cost, Insurance & Freight)' },
  { value: 'exw', label: 'EXW (Ex Works)' },
  { value: 'dap', label: 'DAP (Delivered at Place)' },
];

const neuCard = {
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
};

const neuInput: React.CSSProperties = {
  boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)',
};

const neuButton: React.CSSProperties = {
  background: '#f5f5f5',
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 8px 16px -4px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)',
};

const neuItemCard: React.CSSProperties = {
  background: '#f5f5f5',
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 4px 10px -2px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5), 3px 3px 6px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.9)',
};

export default function QuotationPage() {
  const t = useTranslations('quotation');
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      products: [{ productId: '', quantity: '', packagingPreference: '', notes: '' }],
      shippingMethod: 'fob',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const formData = watch();

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(['companyName', 'contactName', 'email', 'phone', 'country']);
      case 2:
        return await trigger('products');
      case 3:
        return await trigger(['shippingMethod', 'destinationPort']);
      default:
        return true;
    }
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: QuotationFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Quotation submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id.toString() === productId);
    if (!product) return '';
    return locale === 'ar' ? product.name_ar : product.name_en;
  };

  if (isSuccess) {
    return (
      <section className="min-h-screen py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}>
              <CheckCircle className="w-12 h-12 text-gray-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('success.title')}
            </h1>
            <p className="text-xl text-gray-500 mb-8">
              {t('success.message')}
            </p>
            <p className="text-gray-500 mb-8">
              {t('success.reference')}: <span className="font-mono font-bold">{`RFQ-${Date.now().toString(36).toUpperCase()}`}</span>
            </p>
            <a
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-gray-900 transition-all hover:scale-105"
              style={neuButton}
            >
              {t('success.backHome')}
            </a>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]" style={neuCard}>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <ClipboardList className="w-4 h-4" />
                  {t('hero.badge')}
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-500">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-white">
        <Container>
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                const stepStyle: React.CSSProperties = isActive
                  ? { background: '#e0e0e0', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.12), inset -3px -3px 7px rgba(255,255,255,0.9)' }
                  : isCompleted
                  ? { background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }
                  : { background: '#f5f5f5', boxShadow: '3px 3px 6px rgba(0,0,0,0.06), -2px -2px 4px rgba(255,255,255,0.9)' };

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                        style={stepStyle}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-gray-600" />
                        ) : (
                          <Icon className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-sm font-medium ${
                          isActive ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {t(`steps.${step.key}`)}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-4 rounded ${
                          currentStep > step.id ? 'bg-[#d0d0d0]' : 'bg-[#e8e8e8]'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
            <div className="rounded-3xl p-8 bg-[#f5f5f5]" style={neuCard}>
              <AnimatePresence mode="wait">
                {/* Step 1: Company Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {t('form.companyInfo.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Building2 className="w-4 h-4 inline me-2" />
                          {t('form.companyInfo.companyName')} *
                        </label>
                        <input
                          {...register('companyName')}
                          className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none ${errors.companyName ? 'ring-1 ring-red-400' : ''}`}
                          style={neuInput}
                          placeholder={t('form.companyInfo.companyNamePlaceholder')}
                        />
                        {errors.companyName && (
                          <p className="mt-1 text-sm text-red-500">{errors.companyName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline me-2" />
                          {t('form.companyInfo.contactName')} *
                        </label>
                        <input
                          {...register('contactName')}
                          className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none ${errors.contactName ? 'ring-1 ring-red-400' : ''}`}
                          style={neuInput}
                          placeholder={t('form.companyInfo.contactNamePlaceholder')}
                        />
                        {errors.contactName && (
                          <p className="mt-1 text-sm text-red-500">{errors.contactName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline me-2" />
                          {t('form.companyInfo.email')} *
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none ${errors.email ? 'ring-1 ring-red-400' : ''}`}
                          style={neuInput}
                          placeholder={t('form.companyInfo.emailPlaceholder')}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline me-2" />
                          {t('form.companyInfo.phone')} *
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none ${errors.phone ? 'ring-1 ring-red-400' : ''}`}
                          style={neuInput}
                          placeholder={t('form.companyInfo.phonePlaceholder')}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Globe className="w-4 h-4 inline me-2" />
                          {t('form.companyInfo.country')} *
                        </label>
                        <input
                          {...register('country')}
                          className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none ${errors.country ? 'ring-1 ring-red-400' : ''}`}
                          style={neuInput}
                          placeholder={t('form.companyInfo.countryPlaceholder')}
                        />
                        {errors.country && (
                          <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline me-2" />
                          {t('form.companyInfo.address')}
                        </label>
                        <input
                          {...register('address')}
                          className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none"
                          style={neuInput}
                          placeholder={t('form.companyInfo.addressPlaceholder')}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Products */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {t('form.products.title')}
                    </h2>
                    <div className="space-y-6">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="p-6 rounded-2xl"
                          style={neuItemCard}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-900">
                              {t('form.products.product')} {index + 1}
                            </h3>
                            {fields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-400 hover:text-red-600 p-2"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('form.products.selectProduct')} *
                              </label>
                              <select
                                {...register(`products.${index}.productId`)}
                                className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 focus:outline-none ${errors.products?.[index]?.productId ? 'ring-1 ring-red-400' : ''}`}
                                style={neuInput}
                              >
                                <option value="">{t('form.products.selectProductPlaceholder')}</option>
                                {products.map((product) => (
                                  <option key={product.id} value={product.id}>
                                    {locale === 'ar' ? product.name_ar : product.name_en}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('form.products.quantity')} *
                              </label>
                              <input
                                {...register(`products.${index}.quantity`)}
                                className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none ${errors.products?.[index]?.quantity ? 'ring-1 ring-red-400' : ''}`}
                                style={neuInput}
                                placeholder={t('form.products.quantityPlaceholder')}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('form.products.packaging')}
                              </label>
                              <select
                                {...register(`products.${index}.packagingPreference`)}
                                className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 focus:outline-none"
                                style={neuInput}
                              >
                                <option value="">{t('form.products.packagingPlaceholder')}</option>
                                <option value="retail">{t('form.products.packagingOptions.retail')}</option>
                                <option value="foodservice">{t('form.products.packagingOptions.foodservice')}</option>
                                <option value="bulk">{t('form.products.packagingOptions.bulk')}</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('form.products.notes')}
                              </label>
                              <input
                                {...register(`products.${index}.notes`)}
                                className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none"
                                style={neuInput}
                                placeholder={t('form.products.notesPlaceholder')}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => append({ productId: '', quantity: '', packagingPreference: '', notes: '' })}
                        className="w-full py-4 rounded-xl text-gray-600 transition flex items-center justify-center gap-2 font-medium hover:scale-[1.01]"
                        style={{ background: '#ebebeb', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.07), inset -2px -2px 4px rgba(255,255,255,0.9)' }}
                      >
                        <Plus className="w-5 h-5" />
                        {t('form.products.addProduct')}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Shipping */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {t('form.shipping.title')}
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t('form.shipping.method')} *
                        </label>
                        <div className="grid md:grid-cols-2 gap-4">
                          {shippingMethods.map((method) => {
                            const isSelected = formData.shippingMethod === method.value;
                            return (
                              <label
                                key={method.value}
                                className="flex items-center p-4 rounded-xl cursor-pointer transition"
                                style={isSelected
                                  ? { background: '#e0e0e0', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.12), inset -3px -3px 7px rgba(255,255,255,0.9)' }
                                  : { background: '#f5f5f5', boxShadow: '3px 3px 6px rgba(0,0,0,0.06), -2px -2px 4px rgba(255,255,255,0.9)' }
                                }
                              >
                                <input
                                  type="radio"
                                  {...register('shippingMethod')}
                                  value={method.value}
                                  className="sr-only"
                                />
                                <div
                                  className="w-5 h-5 rounded-full me-3 flex items-center justify-center"
                                  style={isSelected
                                    ? { background: '#d0d0d0', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.15), inset -2px -2px 3px rgba(255,255,255,0.9)' }
                                    : { background: '#ebebeb', boxShadow: '2px 2px 4px rgba(0,0,0,0.08), -2px -2px 3px rgba(255,255,255,0.9)' }
                                  }
                                >
                                  {isSelected && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-500" />
                                  )}
                                </div>
                                <span className="font-medium text-gray-700">{method.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('form.shipping.destination')} *
                          </label>
                          <input
                            {...register('destinationPort')}
                            className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none ${errors.destinationPort ? 'ring-1 ring-red-400' : ''}`}
                            style={neuInput}
                            placeholder={t('form.shipping.destinationPlaceholder')}
                          />
                          {errors.destinationPort && (
                            <p className="mt-1 text-sm text-red-500">{errors.destinationPort.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('form.shipping.estimatedDate')}
                          </label>
                          <input
                            {...register('estimatedDate')}
                            type="date"
                            className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 focus:outline-none"
                            style={neuInput}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('form.shipping.specialRequirements')}
                        </label>
                        <textarea
                          {...register('specialRequirements')}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none resize-none"
                          style={neuInput}
                          placeholder={t('form.shipping.specialRequirementsPlaceholder')}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {t('form.review.title')}
                    </h2>
                    <div className="space-y-6">
                      {/* Company Info Summary */}
                      <div className="p-6 rounded-2xl" style={neuItemCard}>
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-gray-600" />
                          {t('form.companyInfo.title')}
                        </h3>
                        <dl className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <dt className="text-gray-500">{t('form.companyInfo.companyName')}</dt>
                            <dd className="font-medium text-gray-900">{formData.companyName}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">{t('form.companyInfo.contactName')}</dt>
                            <dd className="font-medium text-gray-900">{formData.contactName}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">{t('form.companyInfo.email')}</dt>
                            <dd className="font-medium text-gray-900">{formData.email}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">{t('form.companyInfo.phone')}</dt>
                            <dd className="font-medium text-gray-900">{formData.phone}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">{t('form.companyInfo.country')}</dt>
                            <dd className="font-medium text-gray-900">{formData.country}</dd>
                          </div>
                          {formData.address && (
                            <div>
                              <dt className="text-gray-500">{t('form.companyInfo.address')}</dt>
                              <dd className="font-medium text-gray-900">{formData.address}</dd>
                            </div>
                          )}
                        </dl>
                      </div>

                      {/* Products Summary */}
                      <div className="p-6 rounded-2xl" style={neuItemCard}>
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Package className="w-5 h-5 text-gray-600" />
                          {t('form.products.title')}
                        </h3>
                        <div className="space-y-3">
                          {formData.products?.map((product, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200/60 last:border-0">
                              <span className="font-medium text-gray-900">{getProductName(product.productId)}</span>
                              <span className="text-gray-500">{product.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Summary */}
                      <div className="p-6 rounded-2xl" style={neuItemCard}>
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Truck className="w-5 h-5 text-gray-600" />
                          {t('form.shipping.title')}
                        </h3>
                        <dl className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <dt className="text-gray-500">{t('form.shipping.method')}</dt>
                            <dd className="font-medium text-gray-900">
                              {shippingMethods.find(m => m.value === formData.shippingMethod)?.label}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">{t('form.shipping.destination')}</dt>
                            <dd className="font-medium text-gray-900">{formData.destinationPort}</dd>
                          </div>
                          {formData.estimatedDate && (
                            <div>
                              <dt className="text-gray-500">{t('form.shipping.estimatedDate')}</dt>
                              <dd className="font-medium text-gray-900">{formData.estimatedDate}</dd>
                            </div>
                          )}
                          {formData.specialRequirements && (
                            <div className="md:col-span-2">
                              <dt className="text-gray-500">{t('form.shipping.specialRequirements')}</dt>
                              <dd className="font-medium text-gray-900">{formData.specialRequirements}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200/60">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-gray-700 transition-all hover:scale-105 disabled:opacity-40 ${currentStep === 1 ? 'invisible' : ''}`}
                  style={neuButton}
                >
                  <ChevronLeft className="w-5 h-5" />
                  {t('form.prev')}
                </button>
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-gray-700 transition-all hover:scale-105"
                    style={neuButton}
                  >
                    {t('form.next')}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-gray-700 transition-all hover:scale-105 disabled:opacity-60"
                    style={neuButton}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin" />
                        {t('form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t('form.submit')}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}
