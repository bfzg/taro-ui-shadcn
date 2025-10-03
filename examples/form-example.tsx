import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Loading } from '@/components/ui/loading'

interface FormData {
  username: string
  email: string
  password: string
}

export default function FormExample() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof FormData) => (e: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.detail.value
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSubmitted(true)
    
    console.log('表单提交:', formData)
  }

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: ''
    })
    setIsSubmitted(false)
  }

  return (
    <View className="min-h-screen bg-gray-50 p-4">
      <View className="max-w-md mx-auto space-y-6">
        {/* 用户信息卡片 */}
        <Card>
          <CardHeader className="text-center">
            <Avatar 
              src="https://github.com/shadcn.png" 
              fallback="CN"
              size="lg"
              className="mx-auto mb-4"
            />
            <CardTitle>用户注册</CardTitle>
            <Text className="text-sm text-muted-foreground">
              创建你的新账户
            </Text>
          </CardHeader>
        </Card>

        {/* 表单卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              注册信息
              {isSubmitted && (
                <Badge variant="secondary">已提交</Badge>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <View className="space-y-2">
              <Text className="text-sm font-medium">用户名</Text>
              <Input
                placeholder="请输入用户名"
                value={formData.username}
                onInput={handleInputChange('username')}
                disabled={isLoading || isSubmitted}
              />
            </View>

            <View className="space-y-2">
              <Text className="text-sm font-medium">邮箱</Text>
              <Input
                type="text"
                placeholder="请输入邮箱地址"
                value={formData.email}
                onInput={handleInputChange('email')}
                disabled={isLoading || isSubmitted}
              />
            </View>

            <View className="space-y-2">
              <Text className="text-sm font-medium">密码</Text>
              <Input
                type="password"
                placeholder="请输入密码"
                value={formData.password}
                onInput={handleInputChange('password')}
                disabled={isLoading || isSubmitted}
                maxlength={20}
              />
            </View>

            {/* 表单状态显示 */}
            {isSubmitted && (
              <View className="p-3 bg-green-50 rounded-md">
                <Text className="text-sm text-green-800">
                  ✅ 注册成功！欢迎 {formData.username}
                </Text>
              </View>
            )}
          </CardContent>

          <CardFooter className="flex gap-2">
            {!isSubmitted ? (
              <Button 
                className="flex-1"
                onClick={handleSubmit}
                disabled={isLoading || !formData.username || !formData.email || !formData.password}
                loading={isLoading}
              >
                {isLoading ? '注册中...' : '注册'}
              </Button>
            ) : (
              <Button 
                variant="outline"
                className="flex-1"
                onClick={resetForm}
              >
                重新注册
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* 功能演示卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>组件演示</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* 按钮变体 */}
            <View className="space-y-2">
              <Text className="text-sm font-medium">按钮变体</Text>
              <View className="flex flex-wrap gap-2">
                <Button size="sm">默认</Button>
                <Button variant="secondary" size="sm">次要</Button>
                <Button variant="outline" size="sm">轮廓</Button>
                <Button variant="ghost" size="sm">幽灵</Button>
              </View>
            </View>

            {/* 徽章演示 */}
            <View className="space-y-2">
              <Text className="text-sm font-medium">状态徽章</Text>
              <View className="flex flex-wrap gap-2">
                <Badge>默认</Badge>
                <Badge variant="secondary">次要</Badge>
                <Badge variant="destructive">危险</Badge>
                <Badge variant="outline">轮廓</Badge>
              </View>
            </View>

            {/* 加载状态 */}
            <View className="space-y-2">
              <Text className="text-sm font-medium">加载状态</Text>
              <View className="flex items-center gap-4">
                <Loading size="sm" />
                <Loading />
                <Loading size="lg" />
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  )
}