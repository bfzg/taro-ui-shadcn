import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Badge,
  Avatar,
  Loading
} from 'taro-ui-shadcn';

export default function BasicUsageExample() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View className="p-4 space-y-4">
      <Text className="text-2xl font-bold mb-4">Taro UI Shadcn 组件示例</Text>

      {/* Button 示例 */}
      <Card>
        <CardHeader>
          <CardTitle>Button 按钮组件</CardTitle>
          <CardDescription>不同变体和尺寸的按钮示例</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <View className="flex flex-wrap gap-2">
            <Button variant="default">默认按钮</Button>
            <Button variant="secondary">次要按钮</Button>
            <Button variant="destructive">危险按钮</Button>
            <Button variant="outline">轮廓按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="link">链接按钮</Button>
          </View>
          
          <View className="flex flex-wrap gap-2">
            <Button size="sm">小按钮</Button>
            <Button size="default">默认按钮</Button>
            <Button size="lg">大按钮</Button>
          </View>

          <View className="flex flex-wrap gap-2">
            <Button disabled>禁用按钮</Button>
            <Button loading={loading} onClick={handleButtonClick}>
              {loading ? '加载中...' : '点击加载'}
            </Button>
          </View>
        </CardContent>
      </Card>

      {/* Input 示例 */}
      <Card>
        <CardHeader>
          <CardTitle>Input 输入框组件</CardTitle>
          <CardDescription>不同类型的输入框示例</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="请输入文本"
            value={inputValue}
            onInput={setInputValue}
          />
          <Input
            type="password"
            placeholder="请输入密码"
          />
          <Input
            type="number"
            placeholder="请输入数字"
          />
          <Input
            disabled
            placeholder="禁用状态"
          />
        </CardContent>
      </Card>

      {/* Badge 示例 */}
      <Card>
        <CardHeader>
          <CardTitle>Badge 徽章组件</CardTitle>
          <CardDescription>不同变体的徽章示例</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="flex flex-wrap gap-2">
            <Badge>默认徽章</Badge>
            <Badge variant="secondary">次要徽章</Badge>
            <Badge variant="destructive">危险徽章</Badge>
            <Badge variant="outline">轮廓徽章</Badge>
          </View>
        </CardContent>
      </Card>

      {/* Avatar 示例 */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar 头像组件</CardTitle>
          <CardDescription>不同尺寸和状态的头像示例</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="flex items-center gap-4">
            <Avatar size="sm" fallback="S" />
            <Avatar size="md" fallback="M" />
            <Avatar size="lg" fallback="L" />
            <Avatar 
              src="https://github.com/shadcn.png" 
              alt="Avatar" 
              fallback="CN" 
            />
          </View>
        </CardContent>
      </Card>

      {/* Loading 示例 */}
      <Card>
        <CardHeader>
          <CardTitle>Loading 加载组件</CardTitle>
          <CardDescription>不同尺寸的加载指示器示例</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="flex items-center gap-4">
            <Loading size="sm" />
            <Loading size="md" />
            <Loading size="lg" />
          </View>
        </CardContent>
      </Card>

      {/* 嵌套卡片示例 */}
      <Card>
        <CardHeader>
          <CardTitle>组合使用示例</CardTitle>
          <CardDescription>多个组件组合使用的示例</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="space-y-4">
            <View className="flex items-center gap-2">
              <Avatar fallback="U" />
              <View className="flex-1">
                <Text className="font-medium">用户名</Text>
                <Text className="text-sm text-muted-foreground">用户描述</Text>
              </View>
              <Badge variant="secondary">VIP</Badge>
            </View>
            
            <Input placeholder="发表评论..." />
            
            <View className="flex justify-end gap-2">
              <Button variant="outline">取消</Button>
              <Button>发布</Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}