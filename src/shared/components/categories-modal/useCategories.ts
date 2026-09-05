// hooks/useCategoriesModal.ts

import { useState, useEffect, useCallback, useRef } from 'react';
import { Category } from './categories.types';
import { categoryApi } from './categories.api';

interface UseCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement | null> | undefined;
}

interface UseCategoriesModalReturn {
  // State
  mainCategories: Category[];
  selectedCategory: Category | null;
  subCategories: Category[];
  selectedSubCategory: Category | null;
  isLoading: boolean;
  error: string | null;
  position: { top: number; left: number };
  modalRef: React.RefObject<HTMLDivElement | null>;
  
  // Handlers
  handleCategorySelect: (category: Category) => void;
  handleSubCategorySelect: (category: Category) => void;
  handleClose: () => void;
  handleViewAllProducts: () => void;
  resetStates: () => void;
  
  // Helpers
  getImageUrl: (image: string | null | undefined) => string;
  getCategoryDescription: (category: Category, parentCategory?: Category | null) => string | null;
  truncateDescription: (text: string | null | undefined, maxLength?: number) => string;
}

export const useCategoriesModal = ({
  isOpen,
  onClose,
  anchorRef,
}: UseCategoriesModalProps): UseCategoriesModalReturn => {
  // ============ State ============
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  const modalRef = useRef<HTMLDivElement>(null);
  const isFirstLoadRef = useRef(true);

  // ============ Helper Functions ============
  const getImageUrl = useCallback((image: string | null | undefined): string => {
    return image || "/images/default-category.png";
  }, []);

  const truncateDescription = useCallback((
    text: string | null | undefined, 
    maxLength: number = 40
  ): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }, []);

  const getCategoryDescription = useCallback((
    category: Category,
    parentCategory?: Category | null
  ): string | null => {
    if (category.description?.trim()) {
      return category.description;
    }
    if (parentCategory?.description?.trim()) {
      return parentCategory.description;
    }
    return null;
  }, []);

  // ============ Reset States ============
  const resetStates = useCallback(() => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSubCategories([]);
    setError(null);
    isFirstLoadRef.current = true;
  }, []);

  // ============ Fetch Categories ============
  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await categoryApi.getCategories();
      setMainCategories(response.data);
      
      // ============ انتخاب اولین دسته به صورت خودکار ============
      if (response.data.length > 0) {
        const firstCategory = response.data[0];
        // بررسی می‌کنیم که firstCategory undefined نباشه
        if (firstCategory) {
          setSelectedCategory(firstCategory);
          setSubCategories(firstCategory.children || []);
        }
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err instanceof Error ? err.message : "خطا در دریافت دسته‌بندی‌ها");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============ Update Position ============
  const updatePosition = useCallback(() => {
    if (!isOpen || !anchorRef?.current) return;
    
    const rect = anchorRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 4,
      left: rect.right,
    });
  }, [isOpen, anchorRef]);

  // ============ Handlers ============
  const handleCategorySelect = useCallback((category: Category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setSubCategories(category.children || []);
  }, []);

  const handleSubCategorySelect = useCallback((category: Category) => {
    setSelectedSubCategory(category);
    setTimeout(() => {
      onClose();
    }, 50);
  }, [onClose]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleViewAllProducts = useCallback(() => {
    onClose();
  }, [onClose]);

  // ============ Outside Click Handler ============
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (!isOpen) return;
    
    const target = event.target as Node;
    
    if (
      modalRef.current?.contains(target) ||
      anchorRef?.current?.contains(target)
    ) {
      return;
    }
    
    handleClose();
  }, [isOpen, anchorRef, handleClose]);

  // ============ Effects ============
  
  // Effect 1: Fetch categories when modal opens
  useEffect(() => {
    if (isOpen) {
      isFirstLoadRef.current = true;
      fetchCategories();
      updatePosition();
    }
  }, [isOpen, fetchCategories, updatePosition]);

  // Effect 2: Update position on resize/scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => updatePosition();
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
    };
  }, [isOpen, updatePosition]);

  // Effect 3: Outside click listener
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleOutsideClick);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [isOpen, handleOutsideClick]);

  // Effect 4: Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetStates();
    }
  }, [isOpen, resetStates]);

  // ============ Return ============
  return {
    mainCategories,
    selectedCategory,
    subCategories,
    selectedSubCategory,
    isLoading,
    error,
    position,
    modalRef,
    handleCategorySelect,
    handleSubCategorySelect,
    handleClose,
    handleViewAllProducts,
    resetStates,
    getImageUrl,
    getCategoryDescription,
    truncateDescription,
  };
};