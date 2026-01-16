# Themesite

Themesite 是一个包含日夜自动切换功能的 VS Code 主题插件。

## 功能特性

*   **自动日夜切换**：根据时间（早上6点至晚上6点）自动在深色和浅色主题间切换。
*   **深色主题 (Themesite Dark)**：专为夜间编程设计的深色配色，拥有清晰的语法高亮。
*   **浅色主题 (Themesite Light)**：适合白天使用的护眼浅色配色。

## 扩展设置

本插件提供以下配置项：

*   `themesite.autoSwitch`: 开启/关闭自动切换功能 (默认: true)
*   `themesite.dayTheme`: 白天使用的主题 (默认: "Themesite Light")
*   `themesite.nightTheme`: 晚上使用的主题 (默认: "Themesite Dark")

## 使用方法

安装插件后，插件会自动根据当前时间设置主题。你也可以通过命令面板 (`Ctrl+Shift+P`) 运行以下命令手动触发：

*   `Themesite: Force Update Theme Logic`

**Enjoy!**
