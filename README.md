# Intergalactic Analysis Frontend

Веб-приложение для анализа и генерации CSV файлов с современной архитектурой и комплексным тестированием.

## 🚀 Технологический стек

-   **Frontend Framework:** React 19.1.0 + TypeScript
-   **Build Tool:** Vite 7.0.0
-   **State Management:** Zustand 5.0.6
-   **Routing:** React Router DOM 7.6.3
-   **Testing:** Vitest + Playwright + Testing Library
-   **Styling:** CSS Modules
-   **Linting:** ESLint + TypeScript ESLint

## 🏗️ Архитектура проекта

### Структура папок (Feature-Sliced Design)

```
src/
├── app/                    # Конфигурация приложения
│   ├── providers/         # Провайдеры (Router, Store)
│   └── styles/           # Глобальные стили
├── entities/              # Бизнес-сущности
│   └── highlights/       # Модель и UI для подсветок
├── features/              # Функциональные модули
│   ├── analyse-file/     # Анализ файлов
│   └── history/          # История операций
├── pages/                 # Страницы приложения
│   ├── analyse-page/     # Страница анализа
│   ├── generate-page/    # Страница генерации
│   └── history-page/     # Страница истории
├── shared/                # Переиспользуемые ресурсы
│   ├── assets/           # Статические ресурсы
│   ├── config/           # Конфигурации
│   ├── errors/           # Обработка ошибок
│   ├── helpers/          # Утилиты
│   ├── lib/              # Библиотеки
│   ├── types/            # Типы
│   └── ui/               # UI компоненты
└── widgets/               # Составные виджеты
    ├── Header/           # Заголовок с навигацией
    └── Layout/           # Макет приложения
```

### Принципы архитектуры

1. **Feature-Sliced Design (FSD)** - организация кода по функциональным слоям
2. **Dependency Inversion** - зависимости направлены от внешних слоев к внутренним
3. **Separation of Concerns** - разделение ответственности между слоями
4. **Type Safety** - полная типизация TypeScript
5. **Component Composition** - композиция компонентов

### Слои архитектуры

#### App Layer

-   Конфигурация приложения
-   Провайдеры (Router, Store)
-   Глобальные стили и переменные

#### Pages Layer

-   Страницы приложения
-   Композиция виджетов и фич
-   Маршрутизация

#### Widgets Layer

-   Составные UI блоки
-   Переиспользуемые виджеты
-   Макеты страниц

#### Features Layer

-   Бизнес-логика приложения
-   Управление состоянием (Zustand)
-   API интеграция

#### Entities Layer

-   Бизнес-сущности
-   Модели данных
-   UI для сущностей

#### Shared Layer

-   Переиспользуемые ресурсы
-   UI компоненты
-   Утилиты и хелперы

## 🧪 Тестирование

### Уровни тестирования

#### 1. Модульные тесты (Unit Tests)

-   **Фреймворк:** Vitest + Testing Library
-   **Покрытие:** Утилиты, хелперы, компоненты
-   **Пример:**

```typescript
describe('Утилиты для работы с localStorage', () => {
	it('должна возвращать пустой массив, если история пуста', () => {
		expect(getHistory()).toEqual([]);
	});
});
```

#### 2. Интеграционные тесты (Integration Tests)

-   **Фреймворк:** Vitest + Testing Library + React Router
-   **Покрытие:** Взаимодействие компонентов, API интеграция
-   **Пример:**

```typescript
it('TC-AP-003: Отображение ошибки при сбое обработки', async () => {
	global.fetch = vi
		.fn()
		.mockImplementation(() => Promise.resolve({ ok: false, status: 400 }));

	render(
		<MemoryRouter>
			<AnalysePage />
		</MemoryRouter>
	);
	// Тестирование пользовательского взаимодействия
});
```

#### 3. Функциональные тесты (E2E Tests)

-   **Фреймворк:** Playwright
-   **Покрытие:** Полные пользовательские сценарии
-   **Пример:**

```typescript
test('TC-AP-001: Успешная загрузка CSV файла', async ({ pages, actions }) => {
	await actions.analyse.uploadFile(filePath);
	await expect(pages.analyse.dropzone).toContainText('test-data.csv');
	await actions.analyse.send();
	await expect(pages.analyse.highlightsGrid).toBeVisible();
});
```

### Конфигурация тестов

#### Vitest (vitest.config.ts)

### Тест-кейсы

| ID        | Название                                        | Тип         | Описание                                 |
| --------- | ----------------------------------------------- | ----------- | ---------------------------------------- |
| TC-AP-001 | Успешная загрузка CSV файла через кнопку        | E2E         | Загрузка файла и отображение результатов |
| TC-AP-002 | Успешная загрузка CSV файла через Drag-and-Drop | E2E         | Drag-and-Drop загрузка файла             |
| TC-AP-003 | Отображение ошибки при сбое обработки           | Integration | Обработка серверных ошибок               |
| TC-AP-004 | Сброс выбранного файла                          | Integration | Отмена выбора файла                      |
| TC-GP-001 | Успешная генерация и скачивание CSV файла       | E2E         | Генерация и скачивание файла             |
| TC-GP-002 | Отображение ошибки при сбое генерации           | Integration | Обработка ошибок генерации               |
| TC-HY-001 | Отображение списка записей в истории            | Integration | Отображение истории операций             |
| TC-HY-002 | Удаление записи из истории                      | Integration | Удаление записей из истории              |

## 📦 Установка и запуск

### Предварительные требования

-   Node.js 18+
-   npm или yarn

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

### Сборка для продакшена

```bash
npm run build
```

### Запуск тестов

```bash
# Модульные тесты
npm test

# Функциональные тесты
npm run test:functional
```
