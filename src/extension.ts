// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "themesite" is now active!');

	// 定义自动切换逻辑
	const updateThemeBasedOnTime = async () => {
		const config = vscode.workspace.getConfiguration();
		
		// 检查开关是否开启
		if (!config.get('themesite.autoSwitch')) {
			return;
		}

		// 获取当前设置
		const dayTheme = config.get<string>('themesite.dayTheme') || 'Themesite Light';
		const nightTheme = config.get<string>('themesite.nightTheme') || 'Themesite Dark';
		
		const now = new Date();
		const hours = now.getHours();
		
		// 简单的日夜判断：6:00 - 18:00 为白天
		const isDayTime = hours >= 6 && hours < 18;
		const targetTheme = isDayTime ? dayTheme : nightTheme;
		
		// 获取当前正在使用的主题
		const currentTheme = config.get<string>('workbench.colorTheme');

		// 只有当主题不一致时才切换，避免重复刷新
		if (currentTheme !== targetTheme) {
			try {
				await config.update('workbench.colorTheme', targetTheme, vscode.ConfigurationTarget.Global);
				vscode.window.setStatusBarMessage(`[Themesite] Auto-switched to ${isDayTime ? 'Day' : 'Night'} theme: ${targetTheme}`, 5000);
			} catch (error) {
				console.error('Failed to set theme:', error);
			}
		}
	};

	// 1. 注册命令：允许用户手动触发一次检查
	const disposable = vscode.commands.registerCommand('themesite.applyTheme', async () => {
		await updateThemeBasedOnTime();
		vscode.window.showInformationMessage('Themesite: Theme logic executed based on current time.');
	});

	// 2. 启动时立即检查一次
	updateThemeBasedOnTime();

	// 3. 设置定时器：每5分钟检查一次 (300000 ms)
	const intervalId = setInterval(updateThemeBasedOnTime, 300000);

	// 确保插件停用时清除定时器
	context.subscriptions.push(disposable);
	context.subscriptions.push({ dispose: () => clearInterval(intervalId) });
}

// This method is called when your extension is deactivated
export function deactivate() {}
